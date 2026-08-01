// Leaderboard API, co-located with the site as a Pages Function.
// Deployed as part of `wrangler pages deploy` — no separate service, no
// CORS (same origin as the static site), no client-side URL to configure.
//
// GET  /api/scores?category=<id>&limit=<n>
// POST /api/scores
//
// D1 binding `DB` comes from wrangler.jsonc at the project root.

import { isValidCategory, validateSubmission, hashIp } from './_validate.js'

const MAX_LIMIT = 25
const RATE_LIMIT_WINDOW_MS = 10_000
const RATE_LIMIT_MAX_SUBMISSIONS = 3

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

async function handleGet(request, env) {
  const url = new URL(request.url)
  const category = url.searchParams.get('category') || 'all'
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '10', 10) || 10, MAX_LIMIT)

  if (!isValidCategory(category)) {
    return json({ error: 'Unknown category' }, 400)
  }

  const { results } = await env.DB.prepare(
    `SELECT name, score, total, mode, created_at
     FROM scores
     WHERE category_id = ?
     ORDER BY score DESC, created_at ASC
     LIMIT ?`,
  )
    .bind(category, limit)
    .all()

  return json(results, 200)
}

async function handlePost(request, env) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const result = validateSubmission(body)
  if (!result.ok) {
    return json({ error: result.error }, 400)
  }
  const { categoryId, name, score, total, mode } = result

  // Rate limit by a hash of the IP — never store the raw IP.
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
  const ipHash = await hashIp(ip)
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW_MS

  const { results: recent } = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM submissions WHERE ip_hash = ? AND ts > ?`,
  )
    .bind(ipHash, windowStart)
    .all()

  if ((recent[0]?.n || 0) >= RATE_LIMIT_MAX_SUBMISSIONS) {
    return json({ error: 'Too many submissions — slow down and try again shortly.' }, 429)
  }

  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO scores (category_id, name, score, total, mode, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    ).bind(categoryId, name, score, total, mode, now),
    env.DB.prepare(`INSERT INTO submissions (ip_hash, ts) VALUES (?, ?)`).bind(ipHash, now),
    // Opportunistic cleanup — keeps the submissions table tiny.
    env.DB.prepare(`DELETE FROM submissions WHERE ts < ?`).bind(now - 60_000),
  ])

  return json({ ok: true }, 201)
}

export async function onRequest(context) {
  const { request, env } = context

  try {
    if (request.method === 'GET') return await handleGet(request, env)
    if (request.method === 'POST') return await handlePost(request, env)
  } catch (err) {
    return json({ error: 'Internal error', message: String(err) }, 500)
  }

  return json({ error: 'Method not allowed' }, 405)
}
