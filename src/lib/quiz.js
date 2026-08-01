import { QUESTIONS, CATEGORIES } from '../data/questions.js'
import { QUESTIONS_FR } from '../data/questions.fr.js'

function localizedQuestions(lang = 'en') {
  if (lang !== 'fr') return QUESTIONS

  return QUESTIONS.map((question) => {
    const override = QUESTIONS_FR[question.id]
    return override ? { ...question, ...override } : question
  })
}

// Fisher–Yates shuffle — never mutates the input. Accepts a pluggable
// rng (defaults to Math.random) so the daily challenge can use a seeded
// generator and get the same order for every player.
export function shuffle(arr, rng = Math.random) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function applyDifficulty(pool, difficulty) {
  if (!difficulty || difficulty === 'all') return pool
  return pool.filter((q) => q.difficulty === difficulty)
}

// Returns a round of questions, each with its own options re-shuffled and
// the answer index remapped to match. `rng` defaults to Math.random for
// normal play; pass a seeded rng for deterministic rounds (daily challenge).
export function buildRound(categoryId, count, { difficulty = 'all', rng = Math.random, lang = 'en' } = {}) {
  const questionBank = localizedQuestions(lang)
  let pool
  if (categoryId === 'all') {
    // Draw evenly across categories so a mixed round doesn't skew
    // toward whichever category happens to have the most questions.
    const perCategory = Math.ceil(count / CATEGORIES.length)
    pool = shuffle(
      CATEGORIES.flatMap((cat) =>
        shuffle(applyDifficulty(questionBank.filter((q) => q.category === cat.id), difficulty), rng).slice(
          0,
          perCategory,
        ),
      ),
      rng,
    )
  } else {
    pool = applyDifficulty(questionBank.filter((q) => q.category === categoryId), difficulty)
  }

  const chosen = shuffle(pool, rng).slice(0, Math.min(count, pool.length))

  return chosen.map((question) => {
    const correctOption = question.options[question.answer]
    const shuffledOptions = shuffle(question.options, rng)
    return {
      ...question,
      options: shuffledOptions,
      answer: shuffledOptions.indexOf(correctOption),
    }
  })
}

export function categoryById(id) {
  return CATEGORIES.find((c) => c.id === id)
}
