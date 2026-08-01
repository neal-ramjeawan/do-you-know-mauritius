import { describe, it, expect } from 'vitest'
import { hashStringToSeed, mulberry32, todayKey, rngForDate, daysBetween } from '../lib/dailyChallenge.js'

describe('hashStringToSeed', () => {
  it('is deterministic for the same string', () => {
    expect(hashStringToSeed('2026-07-28')).toBe(hashStringToSeed('2026-07-28'))
  })

  it('differs for different strings', () => {
    expect(hashStringToSeed('2026-07-28')).not.toBe(hashStringToSeed('2026-07-29'))
  })
})

describe('mulberry32', () => {
  it('produces the same sequence for the same seed', () => {
    const rngA = mulberry32(12345)
    const rngB = mulberry32(12345)
    const seqA = [rngA(), rngA(), rngA()]
    const seqB = [rngB(), rngB(), rngB()]
    expect(seqA).toEqual(seqB)
  })

  it('produces values in [0, 1)', () => {
    const rng = mulberry32(1)
    for (let i = 0; i < 50; i++) {
      const v = rng()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })
})

describe('todayKey', () => {
  it('formats as YYYY-MM-DD', () => {
    const key = todayKey(new Date(2026, 6, 28)) // month is 0-indexed: 6 = July
    expect(key).toBe('2026-07-28')
  })

  it('zero-pads single-digit month and day', () => {
    const key = todayKey(new Date(2026, 0, 5)) // Jan 5
    expect(key).toBe('2026-01-05')
  })
})

describe('rngForDate', () => {
  it('gives the same rng output for the same date key', () => {
    const a = rngForDate('2026-07-28')()
    const b = rngForDate('2026-07-28')()
    expect(a).toBe(b)
  })

  it('gives different output for different date keys', () => {
    const a = rngForDate('2026-07-28')()
    const b = rngForDate('2026-07-29')()
    expect(a).not.toBe(b)
  })
})

describe('daysBetween', () => {
  it('returns 1 for consecutive days', () => {
    expect(daysBetween('2026-07-27', '2026-07-28')).toBe(1)
  })

  it('returns 0 for the same day', () => {
    expect(daysBetween('2026-07-28', '2026-07-28')).toBe(0)
  })

  it('returns a negative number when the second date is earlier', () => {
    expect(daysBetween('2026-07-28', '2026-07-27')).toBe(-1)
  })

  it('handles a month boundary correctly', () => {
    expect(daysBetween('2026-07-31', '2026-08-01')).toBe(1)
  })
})
