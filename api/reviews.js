import { list, put } from '@vercel/blob'
import { randomUUID } from 'node:crypto'

const STORAGE_PATH = process.env.REVIEWS_STORAGE_PATH || 'reviews/arced-tile.json'
const MAX_REVIEWS = 200

function sendJson(response, status, payload) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.end(JSON.stringify(payload))
}

function cleanText(value, maxLength) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

function normalizeRating(value) {
  const rating = Number.parseInt(value, 10)
  if (!Number.isFinite(rating)) return 5
  return Math.min(5, Math.max(1, rating))
}

function normalizeReview(review) {
  return {
    id: cleanText(review.id, 80) || randomUUID(),
    name: cleanText(review.name, 70),
    projectType: cleanText(review.projectType, 90),
    rating: normalizeRating(review.rating),
    message: cleanText(review.message, 700),
    createdAt: review.createdAt || new Date().toISOString(),
  }
}

function publicReview(review) {
  const normalized = normalizeReview(review)
  return {
    id: normalized.id,
    name: normalized.name,
    projectType: normalized.projectType,
    rating: normalized.rating,
    message: normalized.message,
    createdAt: normalized.createdAt,
  }
}

function storageReady() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

async function parseBody(request) {
  return await new Promise((resolve, reject) => {
    let body = ''
    request.on('data', (chunk) => {
      body += chunk
      if (body.length > 12_000) {
        reject(new Error('Request body is too large'))
        request.destroy()
      }
    })
    request.on('end', () => {
      if (!body) {
        resolve({})
        return
      }
      try {
        resolve(JSON.parse(body))
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })
    request.on('error', reject)
  })
}

async function readReviews() {
  if (!storageReady()) {
    return { configured: false, reviews: [] }
  }

  const { blobs } = await list({ prefix: STORAGE_PATH, limit: 1000 })
  const blob = blobs.find((item) => item.pathname === STORAGE_PATH)

  if (!blob) {
    return { configured: true, reviews: [] }
  }

  const blobResponse = await fetch(`${blob.url}?t=${Date.now()}`, { cache: 'no-store' })
  if (!blobResponse.ok) {
    throw new Error('Could not read reviews storage')
  }

  const data = await blobResponse.json()
  const reviews = Array.isArray(data.reviews) ? data.reviews.map(publicReview) : []
  return { configured: true, reviews }
}

async function writeReviews(reviews) {
  if (!storageReady()) {
    throw new Error('Reviews storage is not connected')
  }

  await put(
    STORAGE_PATH,
    JSON.stringify({ reviews: reviews.slice(0, MAX_REVIEWS) }, null, 2),
    {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json; charset=utf-8',
    },
  )
}

function isAdmin(request) {
  const expected = process.env.REVIEWS_ADMIN_PASSWORD
  const provided = cleanText(request.headers['x-admin-token'], 200)
  return Boolean(expected && provided && provided === expected)
}

export default async function handler(request, response) {
  if (!['GET', 'POST', 'DELETE'].includes(request.method)) {
    response.setHeader('Allow', 'GET, POST, DELETE')
    sendJson(response, 405, { error: 'Method not allowed' })
    return
  }

  try {
    const url = new URL(request.url, `https://${request.headers.host || 'localhost'}`)
    const { configured, reviews } = await readReviews()

    if (request.method === 'GET') {
      const adminMode = url.searchParams.get('admin') === '1'
      if (adminMode && !isAdmin(request)) {
        sendJson(response, configured ? 401 : 503, {
          error: configured ? 'Admin password is incorrect.' : 'Reviews storage or admin password is not configured yet.',
        })
        return
      }

      sendJson(response, 200, {
        configured,
        reviews: reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      })
      return
    }

    if (!configured) {
      sendJson(response, 503, { error: 'Reviews storage is not connected yet.' })
      return
    }

    if (request.method === 'POST') {
      const body = await parseBody(request)

      if (cleanText(body.website, 200)) {
        sendJson(response, 200, { ok: true })
        return
      }

      const review = normalizeReview({
        id: randomUUID(),
        name: body.name,
        projectType: body.projectType,
        rating: body.rating,
        message: body.message,
        createdAt: new Date().toISOString(),
      })

      if (review.name.length < 2 || review.message.length < 15) {
        sendJson(response, 400, { error: 'Please add your name and a review with at least 15 characters.' })
        return
      }

      const nextReviews = [review, ...reviews].slice(0, MAX_REVIEWS)
      await writeReviews(nextReviews)
      sendJson(response, 201, { review: publicReview(review), reviews: nextReviews.map(publicReview) })
      return
    }

    if (!isAdmin(request)) {
      sendJson(response, 401, { error: 'Admin password is incorrect.' })
      return
    }

    const id = cleanText(url.searchParams.get('id'), 80)
    if (!id) {
      sendJson(response, 400, { error: 'Review id is required.' })
      return
    }

    const nextReviews = reviews.filter((review) => review.id !== id)
    await writeReviews(nextReviews)
    sendJson(response, 200, { reviews: nextReviews.map(publicReview) })
  } catch (error) {
    sendJson(response, 500, {
      error: 'Reviews are temporarily unavailable.',
      detail: process.env.NODE_ENV === 'production' ? undefined : error.message,
    })
  }
}
