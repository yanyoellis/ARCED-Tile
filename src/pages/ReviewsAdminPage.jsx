import { useEffect, useState } from 'react'
import { ArrowRight, RefreshCw, ShieldCheck, Star, Trash2 } from 'lucide-react'
import { SiteFooter } from '../components/SiteFooter.jsx'
import { SiteHeader } from '../components/SiteHeader.jsx'
import { siteSeo, usePageSeo } from '../seo.js'

const TOKEN_KEY = 'arcedReviewsAdminToken'

function Stars({ rating = 5 }) {
  const safeRating = Math.min(5, Math.max(1, Number(rating) || 5))
  return (
    <div className="stars admin-stars" aria-label={`${safeRating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((number) => (
        <Star key={number} fill={number <= safeRating ? 'currentColor' : 'none'} aria-hidden="true" />
      ))}
    </div>
  )
}

function formatDate(value) {
  if (!value) return 'No date'

  try {
    return new Intl.DateTimeFormat('en-CA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(value))
  } catch {
    return value
  }
}

export function ReviewsAdminPage() {
  usePageSeo(siteSeo.reviewsAdmin)

  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [reviews, setReviews] = useState([])
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function loadReviews(nextToken = token) {
    if (!nextToken) return

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/reviews?admin=1', {
        headers: {
          Accept: 'application/json',
          'x-admin-token': nextToken,
        },
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Could not load reviews.')
      }

      setReviews(Array.isArray(data.reviews) ? data.reviews : [])
      setStatus('ready')
      setMessage('Reviews loaded.')
    } catch (error) {
      setStatus('error')
      setMessage(error.message || 'Could not load reviews.')
    }
  }

  useEffect(() => {
    const savedToken = window.sessionStorage.getItem(TOKEN_KEY)
    if (savedToken) {
      setToken(savedToken)
      loadReviews(savedToken)
    }
  }, [])

  function handleLogin(event) {
    event.preventDefault()
    const trimmedPassword = password.trim()
    if (!trimmedPassword) return
    window.sessionStorage.setItem(TOKEN_KEY, trimmedPassword)
    setToken(trimmedPassword)
    loadReviews(trimmedPassword)
  }

  function handleLogout() {
    window.sessionStorage.removeItem(TOKEN_KEY)
    setToken('')
    setPassword('')
    setReviews([])
    setStatus('idle')
    setMessage('')
  }

  async function handleDelete(review) {
    const confirmed = window.confirm(`Delete review from ${review.name}?`)
    if (!confirmed) return

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch(`/api/reviews?id=${encodeURIComponent(review.id)}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'x-admin-token': token,
        },
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Could not delete review.')
      }

      setReviews(Array.isArray(data.reviews) ? data.reviews : reviews.filter((item) => item.id !== review.id))
      setStatus('ready')
      setMessage('Review deleted.')
    } catch (error) {
      setStatus('error')
      setMessage(error.message || 'Could not delete review.')
    }
  }

  return (
    <div className="admin-page">
      <SiteHeader currentPage="reviews-admin" />
      <section className="legal-hero admin-hero">
        <div className="shell">
          <p className="eyebrow">Private dashboard</p>
          <h1>Review Admin</h1>
          <p>Delete customer reviews from the ARCED tile website.</p>
        </div>
      </section>

      <section className="section admin-section">
        <div className="shell admin-layout">
          <aside className="admin-card admin-card--intro">
            <ShieldCheck aria-hidden="true" />
            <h2>Only for ARCED</h2>
            <p>This page is hidden from search engines. Use the admin password from Vercel to manage public client reviews.</p>
            <a className="text-link" href="/">Back to website <ArrowRight aria-hidden="true" /></a>
          </aside>

          <div className="admin-card admin-panel">
            {!token ? (
              <form className="admin-login" onSubmit={handleLogin}>
                <h2>Enter admin password</h2>
                <label>
                  Admin Password
                  <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
                </label>
                <button className="button" type="submit">Open Reviews <ArrowRight aria-hidden="true" /></button>
              </form>
            ) : (
              <>
                <div className="admin-toolbar">
                  <div>
                    <p className="eyebrow">Published reviews</p>
                    <h2>{reviews.length} review{reviews.length === 1 ? '' : 's'}</h2>
                  </div>
                  <div className="admin-actions">
                    <button className="button button--small" type="button" onClick={() => loadReviews()} disabled={status === 'loading'}>
                      <RefreshCw aria-hidden="true" /> Refresh
                    </button>
                    <button className="button button--small button--muted" type="button" onClick={handleLogout}>Log out</button>
                  </div>
                </div>

                {message && <p className={`admin-message admin-message--${status === 'error' ? 'error' : 'ok'}`}>{message}</p>}

                <div className="admin-review-list">
                  {reviews.length === 0 && <p className="admin-empty">No reviews yet.</p>}
                  {reviews.map((review) => (
                    <article className="admin-review" key={review.id}>
                      <div>
                        <Stars rating={review.rating} />
                        <h3>{review.name}</h3>
                        <p>{review.message}</p>
                        <small>{review.projectType || 'ARCED client'} · {formatDate(review.createdAt)}</small>
                      </div>
                      <button type="button" className="admin-delete" onClick={() => handleDelete(review)} disabled={status === 'loading'}>
                        <Trash2 aria-hidden="true" /> Delete
                      </button>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
