// Leaderboard read/write. Talks to the co-located Pages Function at
// /api/scores (functions/api/scores.js) — same origin as the site, so
// no CORS and nothing to configure at build time. Falls back to
// localStorage automatically if that route isn't reachable, which also
// covers plain `npm run dev` (Vite alone doesn't serve /functions — use
// `npm run pages:dev` to test the full stack locally).

const API_ENDPOINT = '/api/scores'

const LOCAL_KEY = 'zwazo-leaderboard-v1'
const NAME_KEY = 'zwazo-player-name'
const MAX_LOCAL_PER_CATEGORY = 50

export function getSavedName() {
  try {
    return localStorage.getItem(NAME_KEY) || ''
  } catch {
    return ''
  }
}

export function saveName(name) {
  try {
    localStorage.setItem(NAME_KEY, name)
  } catch {
    // ignore — private browsing or storage disabled
  }
}

function readLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeLocal(entries) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(entries))
  } catch {
    // storage unavailable — fail silently, the round still counts
  }
}

// Keeps local storage from growing without bound by trimming each
// category down to its best MAX_LOCAL_PER_CATEGORY entries.
function pruneLocal(entries) {
  const byCategory = {}
  for (const e of entries) {
    ;(byCategory[e.categoryId] ||= []).push(e)
  }
  const pruned = []
  for (const list of Object.values(byCategory)) {
    list.sort((a, b) => b.score - a.score || a.createdAt - b.createdAt)
    pruned.push(...list.slice(0, MAX_LOCAL_PER_CATEGORY))
  }
  return pruned
}

export async function submitScore({ categoryId, name, score, total, mode = 'classic' }) {
  const cleanName = (name || 'Anonymous').trim().slice(0, 24) || 'Anonymous'
  saveName(cleanName)

  try {
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryId, name: cleanName, score, total, mode }),
    })
    if (!res.ok) throw new Error(`Leaderboard API responded ${res.status}`)
    return { synced: true }
  } catch (err) {
    console.error('Leaderboard sync failed — saving to this device instead.', err)
  }

  const entry = { categoryId, name: cleanName, score, total, mode, createdAt: Date.now() }
  const all = pruneLocal([...readLocal(), entry])
  writeLocal(all)
  return { synced: false }
}

export async function getTopScores(categoryId, take = 10) {
  try {
    const res = await fetch(`${API_ENDPOINT}?category=${encodeURIComponent(categoryId)}&limit=${take}`)
    if (!res.ok) throw new Error(`Leaderboard API responded ${res.status}`)
    const rows = await res.json()
    // Normalize the API's snake_case timestamp to match the local shape.
    return rows.map((r) => ({ ...r, createdAt: r.created_at }))
  } catch (err) {
    console.error('Leaderboard fetch failed — showing scores from this device instead.', err)
  }

  return readLocal()
    .filter((e) => e.categoryId === categoryId)
    .sort((a, b) => b.score - a.score || a.createdAt - b.createdAt)
    .slice(0, take)
}
