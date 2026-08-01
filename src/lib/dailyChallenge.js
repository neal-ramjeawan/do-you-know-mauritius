// A tiny, dependency-free seeded PRNG (mulberry32) plus a string hash,
// so the daily challenge can deterministically shuffle from a date string
// and every player gets the exact same round on the exact same day.

export function hashStringToSeed(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0
  }
  return h
}

export function mulberry32(seed) {
  let a = seed
  return function rng() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Uses the local calendar date, so "today" matches what the player sees
// on their own clock rather than jumping over at UTC midnight.
export function todayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function rngForDate(dateKey) {
  return mulberry32(hashStringToSeed(dateKey))
}

// Whole-calendar-day difference, used for streak bookkeeping.
export function daysBetween(aKey, bKey) {
  const a = new Date(aKey + 'T00:00:00')
  const b = new Date(bKey + 'T00:00:00')
  return Math.round((b - a) / 86400000)
}
