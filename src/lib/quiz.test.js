import { describe, it, expect } from 'vitest'
import { shuffle, buildRound } from '../lib/quiz.js'
import { QUESTIONS, CATEGORIES } from '../data/questions.js'

// Deterministic rng for tests that need a fixed order.
function fixedRng(sequence) {
  let i = 0
  return () => sequence[i++ % sequence.length]
}

describe('shuffle', () => {
  it('does not mutate the input array', () => {
    const input = [1, 2, 3, 4, 5]
    const copy = [...input]
    shuffle(input)
    expect(input).toEqual(copy)
  })

  it('preserves all elements', () => {
    const input = [1, 2, 3, 4, 5]
    const result = shuffle(input)
    expect(result.slice().sort()).toEqual(input.slice().sort())
  })

  it('is deterministic for a fixed rng', () => {
    const rng = () => 0 // always picks index 0 at each step — a fixed permutation
    const a = shuffle([1, 2, 3, 4, 5], rng)
    const b = shuffle([1, 2, 3, 4, 5], fixedRng([0]))
    expect(a).toEqual(b)
  })
})

describe('Olympian trivia regression checks', () => {
  it('uses the correct athletics framing for the Beijing flag-bearer question', () => {
    const p14 = QUESTIONS.find((q) => q.id === 'p14')
    const s16 = QUESTIONS.find((q) => q.id === 's16')

    expect(p14.q).toContain('track athlete')
    expect(p14.q).not.toContain('swimmer')
    expect(s16.q).toContain('track and field')
    expect(s16.options).toContain('Track and field (athletics)')
    expect(s16.options).not.toContain('Swimming')
  })
})

describe('buildRound', () => {
  it('returns exactly `count` questions for a single category', () => {
    const round = buildRound('history', 10)
    expect(round).toHaveLength(10)
    expect(round.every((q) => q.category === 'history')).toBe(true)
  })

  it('returns unique questions within a round', () => {
    const round = buildRound('history', 10)
    const ids = new Set(round.map((q) => q.id))
    expect(ids.size).toBe(10)
  })

  it('caps at the pool size if count exceeds available questions', () => {
    const round = buildRound('history', 9999)
    const poolSize = QUESTIONS.filter((q) => q.category === 'history').length
    expect(round).toHaveLength(poolSize)
  })

  it('draws from multiple categories for "all"', () => {
    const round = buildRound('all', 10)
    expect(round).toHaveLength(10)
    const categoriesSeen = new Set(round.map((q) => q.category))
    expect(categoriesSeen.size).toBeGreaterThan(1)
  })

  it('filters by difficulty when requested', () => {
    const round = buildRound('history', 20, { difficulty: 'easy' })
    expect(round.every((q) => q.difficulty === 'easy')).toBe(true)
  })

  it('remaps the answer index so it still points at the correct option text', () => {
    const round = buildRound('history', 20)
    for (const q of round) {
      const original = QUESTIONS.find((orig) => orig.id === q.id)
      const correctText = original.options[original.answer]
      expect(q.options[q.answer]).toBe(correctText)
    }
  })

  it('produces the same round for the same seeded rng', () => {
    const seedFn = () => {
      let seed = 42
      return () => {
        seed = (seed * 16807) % 2147483647
        return (seed - 1) / 2147483646
      }
    }
    const roundA = buildRound('all', 10, { rng: seedFn() })
    const roundB = buildRound('all', 10, { rng: seedFn() })
    expect(roundA.map((q) => q.id)).toEqual(roundB.map((q) => q.id))
  })

  it('every category has at least one question, matching CATEGORIES', () => {
    for (const cat of CATEGORIES) {
      const round = buildRound(cat.id, 1)
      expect(round.length).toBeGreaterThan(0)
    }
  })
})
