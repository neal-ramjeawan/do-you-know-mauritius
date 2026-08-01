import { describe, it, expect, beforeEach } from 'vitest'
import { recordRound, readBadgeState, hasPlayedDailyToday, BADGES } from '../lib/badges.js'
import { CATEGORIES } from '../data/questions.js'
import { todayKey } from '../lib/dailyChallenge.js'

beforeEach(() => {
  localStorage.clear()
})

describe('recordRound', () => {
  it('awards first-round on the first finished round', () => {
    const { newlyEarned } = recordRound({ categoryId: 'history', mode: 'classic', score: 3, total: 10 })
    expect(newlyEarned.map((b) => b.id)).toContain('first-round')
  })

  it('does not re-award first-round on a second round', () => {
    recordRound({ categoryId: 'history', mode: 'classic', score: 3, total: 10 })
    const { newlyEarned } = recordRound({ categoryId: 'history', mode: 'classic', score: 3, total: 10 })
    expect(newlyEarned.map((b) => b.id)).not.toContain('first-round')
  })

  it('awards perfect-round on a 10/10', () => {
    const { newlyEarned } = recordRound({ categoryId: 'history', mode: 'classic', score: 10, total: 10 })
    expect(newlyEarned.map((b) => b.id)).toContain('perfect-round')
  })

  it('does not award perfect-round on a non-perfect score', () => {
    const { newlyEarned } = recordRound({ categoryId: 'history', mode: 'classic', score: 9, total: 10 })
    expect(newlyEarned.map((b) => b.id)).not.toContain('perfect-round')
  })

  it('awards speed-demon only for a perfect Speed-mode round', () => {
    const classic = recordRound({ categoryId: 'history', mode: 'classic', score: 10, total: 10 })
    expect(classic.newlyEarned.map((b) => b.id)).not.toContain('speed-demon')

    localStorage.clear()
    const speed = recordRound({ categoryId: 'history', mode: 'speed', score: 10, total: 10 })
    expect(speed.newlyEarned.map((b) => b.id)).toContain('speed-demon')
  })

  it('awards island-native only once every category has a perfect round', () => {
    let lastResult
    CATEGORIES.forEach((cat, i) => {
      lastResult = recordRound({ categoryId: cat.id, mode: 'classic', score: 10, total: 10 })
      if (i < CATEGORIES.length - 1) {
        expect(lastResult.newlyEarned.map((b) => b.id)).not.toContain('island-native')
      }
    })
    expect(lastResult.newlyEarned.map((b) => b.id)).toContain('island-native')
  })

  it('does not count a perfect "all categories" mixed round toward island-native', () => {
    const { newlyEarned } = recordRound({ categoryId: 'all', mode: 'classic', score: 10, total: 10 })
    expect(newlyEarned.map((b) => b.id)).not.toContain('island-native')
    expect(readBadgeState().masteredCategories).toEqual([])
  })

  it('does not count a perfect daily-challenge round toward island-native', () => {
    const { newlyEarned } = recordRound({
      categoryId: 'history',
      mode: 'classic',
      score: 10,
      total: 10,
      isDaily: true,
    })
    expect(newlyEarned.map((b) => b.id)).not.toContain('island-native')
    expect(readBadgeState().masteredCategories).toEqual([])
  })

  it('builds a daily streak on consecutive calendar days', () => {
    const today = todayKey()
    recordRound({ categoryId: 'all', mode: 'classic', score: 5, total: 10, isDaily: true })
    expect(readBadgeState().dailyStreak).toEqual({ count: 1, lastPlayed: today })
  })

  it('does not increment the daily streak twice on the same day', () => {
    recordRound({ categoryId: 'all', mode: 'classic', score: 5, total: 10, isDaily: true })
    recordRound({ categoryId: 'all', mode: 'classic', score: 7, total: 10, isDaily: true })
    expect(readBadgeState().dailyStreak.count).toBe(1)
  })

  it('reports hasPlayedDailyToday accurately', () => {
    expect(hasPlayedDailyToday()).toBe(false)
    recordRound({ categoryId: 'all', mode: 'classic', score: 5, total: 10, isDaily: true })
    expect(hasPlayedDailyToday()).toBe(true)
  })

  it('never earns an unknown badge id', () => {
    const validIds = new Set(BADGES.map((b) => b.id))
    const { newlyEarned } = recordRound({ categoryId: 'history', mode: 'speed', score: 10, total: 10 })
    for (const b of newlyEarned) {
      expect(validIds.has(b.id)).toBe(true)
    }
  })
})
