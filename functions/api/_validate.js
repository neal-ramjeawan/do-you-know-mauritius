// Split from scores.js so these are testable as plain functions, no D1
// mock and no Pages Functions runtime needed — see _validate.test.js.
// Underscore prefix keeps this out of Pages Functions' file-based routing
// (it's not an endpoint).

export const CATEGORY_IDS = new Set([
  'all',
  'history',
  'geography',
  'nature',
  'culture',
  'food',
  'people',
  'sports',
  'fun',
])

export const DAILY_ID_PATTERN = /^daily-\d{4}-\d{2}-\d{2}$/
export const VALID_MODES = new Set(['classic', 'speed'])
export const ROUND_SIZE = 10 // must match ROUND_SIZE in src/App.jsx

export function isValidCategory(id) {
  return typeof id === 'string' && (CATEGORY_IDS.has(id) || DAILY_ID_PATTERN.test(id))
}

export function isValidScore(score, total) {
  return Number.isInteger(score) && score >= 0 && score <= total
}

export function isValidMode(mode) {
  return VALID_MODES.has(mode)
}

export function cleanName(name) {
  return String(name || 'Anonymous').trim().slice(0, 24) || 'Anonymous'
}

// Validates a raw POST body. Returns { ok: true, ...normalizedFields } or
// { ok: false, error }.
export function validateSubmission(body) {
  const { categoryId, name, score, total, mode } = body || {}

  if (!isValidCategory(categoryId)) return { ok: false, error: 'Unknown category' }
  if (total !== ROUND_SIZE) return { ok: false, error: 'Unexpected round size' }
  if (!isValidScore(score, total)) return { ok: false, error: 'Invalid score' }
  if (!isValidMode(mode)) return { ok: false, error: 'Invalid mode' }

  return { ok: true, categoryId, name: cleanName(name), score, total, mode }
}

export async function hashIp(ip) {
  const data = new TextEncoder().encode(ip)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}
