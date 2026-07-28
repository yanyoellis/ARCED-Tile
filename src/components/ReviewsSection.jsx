import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Check, Star } from 'lucide-react'

const ratingOptions = [5, 4, 3, 2, 1]

function ReviewStars({ rating = 5 }) {
  const safeRating = Math.min(5, Math.max(1, Number(rating) || 5))

  return (
    <div className="stars" aria-label={`${safeRating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((number) => (
        <Star key={number} fill={number <= safeRating ? 'currentColor' : 'none'} aria-hidden="true" />
      ))}
    </div>
  )
}

function formatDate(value) {
  if (!value) return ''

  try {
    return new Intl.DateTimeFormat('en-CA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(value))
  } catch {
    return ''
  }
}

export function ReviewsSection({ title, copy, projectOptions = [], formIntro }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [formStatus, setFormStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    let active = true

    async function loadReviews() {
      try {
        const response = await fetch('/api/reviews', { headers: { Accept: 'application/json' } })
        const data = await response.json()
        if (active && response.ok) {
          setReviews(Array.isArray(data.reviews) ? data.reviews : [])
        }
      } catch {
        if (active) setReviews([])
      } finally {
        if (active) setLoading(false)
      }
    }

    loadReviews()
    return () => {
      active = false
    }
  }, [])

  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [reviews])

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    setFormStatus('loading')
    setStatusMessage('')

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Could not publish the review.')
      }

      setReviews(Array.isArray(data.reviews) ? data.reviews : [data.review, ...reviews].filter(Boolean))
      setFormStatus('success')
      setStatusMessage('Thank you. Your review has been published.')
      form.reset()
    } catch (error) {
      setFormStatus('error')
      setStatusMessage(error.message || 'Something went wrong. Please try again later.')
    }
  }

  return (
    <section className="section testimonials live-reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="shell reviews-layout">
        <div className="reviews-main">
          <div className="section-heading">
            <p className="eyebrow">Client reviews</p>
            <h2 id="reviews-title">{title}</h2>
            <p className="section-intro">{copy}</p>
          </div>

          {loading && <div className="review-empty">Loading reviews...</div>}

          {!loading && sortedReviews.length === 0 && (
            <div className="review-empty">
              <strong>No public reviews yet.</strong>
              <span>Be the first client to share your ARCED experience.</span>
            </div>
          )}

          {!loading && sortedReviews.length > 0 && (
            <div className="testimonial-grid review-grid">
              {sortedReviews.map((review) => (
                <figure className="testimonial-card review-card" key={review.id}>
                  <ReviewStars rating={review.rating} />
                  <blockquote>“{review.message}”</blockquote>
                  <figcaption>
                    <strong>{review.name}</strong>
                    <span>{review.projectType || 'ARCED client'}</span>
                    {review.createdAt && <small>{formatDate(review.createdAt)}</small>}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>

        <form className="review-form" onSubmit={handleSubmit} aria-busy={formStatus === 'loading'}>
          <p className="eyebrow">Leave a review</p>
          <h3>How was your project?</h3>
          <p>{formIntro}</p>

          <label>
            Your Name
            <input name="name" autoComplete="name" required placeholder="Your name" />
          </label>

          <div className="field-row">
            <label>
              Project Type
              <select name="projectType" defaultValue="" required>
                <option value="" disabled>Select project</option>
                {projectOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
                <option>Other ARCED project</option>
              </select>
            </label>

            <label>
              Rating
              <select name="rating" defaultValue="5" required>
                {ratingOptions.map((rating) => (
                  <option key={rating} value={rating}>{rating} stars</option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Your Review
            <textarea name="message" rows="5" required minLength="15" maxLength="700" placeholder="Share a few words about the communication, workmanship and finished result." />
          </label>

          <label className="review-honeypot" aria-hidden="true">
            Website
            <input name="website" tabIndex="-1" autoComplete="off" />
          </label>

          <button className="button" type="submit" disabled={formStatus === 'loading'}>
            {formStatus === 'loading' ? 'Publishing...' : 'Publish Review'} <ArrowRight aria-hidden="true" />
          </button>

          {formStatus === 'success' && <p className="form-success" role="status"><Check aria-hidden="true" /> {statusMessage}</p>}
          {formStatus === 'error' && <p className="form-success form-error" role="alert">{statusMessage}</p>}
        </form>
      </div>
    </section>
  )
}
