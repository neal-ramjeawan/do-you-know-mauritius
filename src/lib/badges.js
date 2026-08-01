import { CATEGORIES } from '../data/questions.js'
import { todayKey, daysBetween } from './dailyChallenge.js'

const STATE_KEY = 'zwazo-badges-v1'

export const BADGES = [
  {
    id: 'first-round',
    title: 'First Steps',
    description: 'Finish your first round.',
  },
  {
    id: 'perfect-round',
    title: 'Perfect Round',
    description: 'Get every question right in a single round.',
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Get a perfect score in Speed mode.',
  },
  {
    id: 'island-native',
    title: 'Île Native',
    description: 'Score a perfect round in every one of the 8 categories.',
  },
  {
    id: 'daily-3',
    title: 'Three-Day Streak',
    description: 'Play the Daily Challenge three days in a row.',
  },
  {
    id: 'daily-7',
    title: 'Week-Long Voyager',
    description: 'Play the Daily Challenge seven days in a row.',
  },
]

function defaultState() {
  return {
    earned: [], // badge ids
    masteredCategories: [], // category ids with a perfect round
    dailyStreak: { count: 0, lastPlayed: null },
    roundsPlayed: 0,
  }
}

export function readBadgeState() {
  try {
    const raw = localStorage.getItem(STATE_KEY)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}

function writeBadgeState(state) {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state))
  } catch {
    // ignore — private browsing or storage disabled
  }
}

// Call once per finished round. Returns newly-earned badge objects,
// surfaced as unlock notices on the results screen.
export function recordRound({ categoryId, mode, score, total, isDaily }) {
  const state = readBadgeState()
  const newlyEarned = []

  function earn(id) {
    if (!state.earned.includes(id)) {
      state.earned.push(id)
      const badge = BADGES.find((b) => b.id === id)
      if (badge) newlyEarned.push(badge)
    }
  }

  state.roundsPlayed += 1
  if (state.roundsPlayed === 1) earn('first-round')

  const perfect = score === total

  if (perfect) {
    earn('perfect-round')
    if (mode === 'speed') earn('speed-demon')

    if (categoryId !== 'all' && !isDaily && CATEGORIES.some((c) => c.id === categoryId)) {
      if (!state.masteredCategories.includes(categoryId)) {
        state.masteredCategories.push(categoryId)
      }
      if (CATEGORIES.every((c) => state.masteredCategories.includes(c.id))) {
        earn('island-native')
      }
    }
  }

  if (isDaily) {
    const today = todayKey()
    const { lastPlayed, count } = state.dailyStreak
    if (lastPlayed === today) {
      // already played today — streak unchanged
    } else if (lastPlayed && daysBetween(lastPlayed, today) === 1) {
      state.dailyStreak = { count: count + 1, lastPlayed: today }
    } else {
      state.dailyStreak = { count: 1, lastPlayed: today }
    }
    if (state.dailyStreak.count >= 3) earn('daily-3')
    if (state.dailyStreak.count >= 7) earn('daily-7')
  }

  writeBadgeState(state)
  return { newlyEarned, state }
}

export function hasPlayedDailyToday() {
  const state = readBadgeState()
  return state.dailyStreak.lastPlayed === todayKey()
}
