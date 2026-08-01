import { describe, it, expect } from 'vitest'
import {
  isValidCategory,
  isValidScore,
  isValidMode,
  cleanName,
  validateSubmission,
  hashIp,
} from './_validate.js'

describe('isValidCategory', () => {
  it('accepts "all"', () => {
    expect(isValidCategory('all')).toBe(true)
  })

  it('accepts known category ids', () => {
    expect(isValidCategory('history')).toBe(true)
    expect(isValidCategory('geography')).toBe(true)
  })

  it('accepts a well-formed daily challenge id', () => {
    expect(isValidCategory('daily-2026-07-28')).toBe(true)
  })

  it('rejects a malformed daily id', () => {
    expect(isValidCategory('daily-2026-7-28')).toBe(false)
    expect(isValidCategory('daily-tomorrow')).toBe(false)
  })

  it('rejects unknown categories and non-strings', () => {
    expect(isValidCategory('made-up-category')).toBe(false)
    expect(isValidCategory(null)).toBe(false)
    expect(isValidCategory(42)).toBe(false)
    expect(isValidCategory(undefined)).toBe(false)
  })
})

describe('isValidScore', () => {
  it('accepts integers within [0, total]', () => {
    expect(isValidScore(0, 10)).toBe(true)
    expect(isValidScore(10, 10)).toBe(true)
    expect(isValidScore(5, 10)).toBe(true)
  })

  it('rejects out-of-range or non-integer scores', () => {
    expect(isValidScore(-1, 10)).toBe(false)
    expect(isValidScore(11, 10)).toBe(false)
    expect(isValidScore(5.5, 10)).toBe(false)
    expect(isValidScore('5', 10)).toBe(false)
    expect(isValidScore(NaN, 10)).toBe(false)
  })
})

describe('isValidMode', () => {
  it('accepts classic and speed', () => {
    expect(isValidMode('classic')).toBe(true)
    expect(isValidMode('speed')).toBe(true)
  })

  it('rejects anything else', () => {
    expect(isValidMode('turbo')).toBe(false)
    expect(isValidMode(undefined)).toBe(false)
  })
})

describe('cleanName', () => {
  it('trims whitespace', () => {
    expect(cleanName('  Neal  ')).toBe('Neal')
  })

  it('truncates to 24 characters', () => {
    const long = 'a'.repeat(50)
    expect(cleanName(long)).toHaveLength(24)
  })

  it('falls back to Anonymous for empty, whitespace-only, or missing input', () => {
    expect(cleanName('')).toBe('Anonymous')
    expect(cleanName('   ')).toBe('Anonymous')
    expect(cleanName(undefined)).toBe('Anonymous')
  })
})

describe('validateSubmission', () => {
  const base = { categoryId: 'history', name: 'Neal', score: 8, total: 10, mode: 'classic' }

  it('accepts a well-formed submission', () => {
    const result = validateSubmission(base)
    expect(result.ok).toBe(true)
    expect(result.categoryId).toBe('history')
    expect(result.name).toBe('Neal')
  })

  it('rejects an unknown category', () => {
    const result = validateSubmission({ ...base, categoryId: 'nope' })
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/category/i)
  })

  it('rejects a total that is not 10', () => {
    const result = validateSubmission({ ...base, total: 20 })
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/round size/i)
  })

  it('rejects a score outside [0, total]', () => {
    const result = validateSubmission({ ...base, score: 11 })
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/score/i)
  })

  it('rejects an invalid mode', () => {
    const result = validateSubmission({ ...base, mode: 'nightmare' })
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/mode/i)
  })

  it('rejects a missing body', () => {
    const result = validateSubmission(null)
    expect(result.ok).toBe(false)
  })
})

describe('hashIp', () => {
  it('is deterministic for the same input', async () => {
    const a = await hashIp('203.0.113.1')
    const b = await hashIp('203.0.113.1')
    expect(a).toBe(b)
  })

  it('differs for different input', async () => {
    const a = await hashIp('203.0.113.1')
    const b = await hashIp('203.0.113.2')
    expect(a).not.toBe(b)
  })

  it('returns a 64-character hex string (SHA-256)', async () => {
    const hash = await hashIp('203.0.113.1')
    expect(hash).toMatch(/^[0-9a-f]{64}$/)
  })
})
