import { useState } from 'react'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import CategorySelect from './components/CategorySelect.jsx'
import Quiz from './components/Quiz.jsx'
import ResultsScreen from './components/ResultsScreen.jsx'
import Badges from './components/Badges.jsx'
import { buildRound, categoryById } from './lib/quiz.js'
import { todayKey, rngForDate } from './lib/dailyChallenge.js'

const ROUND_SIZE = 10

export default function App() {
  const [screen, setScreen] = useState('home') // home | category | quiz | results | badges
  const [categoryId, setCategoryId] = useState(null)
  const [mode, setMode] = useState('classic')
  const [difficulty, setDifficulty] = useState('all')
  const [isDaily, setIsDaily] = useState(false)
  const [round, setRound] = useState([])
  const [answers, setAnswers] = useState([])
  const [previousScreen, setPreviousScreen] = useState('home')

  const categoryLabel = isDaily
    ? 'Daily Challenge'
    : categoryId === 'all'
      ? 'All Categories'
      : categoryById(categoryId)?.label ?? ''

  function startCategory(id, opts = {}) {
    setCategoryId(id)
    setMode(opts.mode ?? 'classic')
    setDifficulty(opts.difficulty ?? 'all')
    setIsDaily(false)
    setRound(buildRound(id, ROUND_SIZE, { difficulty: opts.difficulty ?? 'all' }))
    setScreen('quiz')
  }

  function startDaily() {
    setCategoryId('all')
    setMode('classic')
    setDifficulty('all')
    setIsDaily(true)
    setRound(buildRound('all', ROUND_SIZE, { rng: rngForDate(todayKey()) }))
    setScreen('quiz')
  }

  function finishRound(finalAnswers) {
    setAnswers(finalAnswers)
    setScreen('results')
  }

  function replay() {
    if (isDaily) {
      startDaily()
      return
    }
    setRound(buildRound(categoryId, ROUND_SIZE, { difficulty }))
    setScreen('quiz')
  }

  function goHome() {
    setScreen('home')
  }

  function goCategory() {
    setScreen('category')
  }

  function goBadges(fromScreen = 'home') {
    setPreviousScreen(fromScreen)
    setScreen('badges')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-turmeric-500 focus:text-basalt focus:px-4 focus:py-2 focus:rounded-full"
      >
        Skip to main content
      </a>

      {screen !== 'home' && <Header onHome={goHome} />}

      <main id="main-content" className="flex-1">
        {screen === 'home' && (
          <Home
            onStart={goCategory}
            onStartDaily={startDaily}
            onViewBadges={() => goBadges('home')}
          />
        )}
        {screen === 'category' && <CategorySelect onPick={startCategory} />}
        {screen === 'quiz' && (
          <Quiz round={round} categoryLabel={categoryLabel} mode={mode} onFinish={finishRound} onQuit={goCategory} />
        )}
        {screen === 'results' && (
          <ResultsScreen
            answers={answers}
            categoryId={categoryId}
            categoryLabel={categoryLabel}
            mode={mode}
            isDaily={isDaily}
            onReplay={replay}
            onChangeCategory={goCategory}
            onHome={goHome}
          />
        )}
        {screen === 'badges' && <Badges onBack={() => setScreen(previousScreen)} />}
      </main>

      <footer className="px-5 sm:px-8 py-6 text-center">
        <p className="font-mono text-[11px] text-shell-300/30">
          Zwazo — an unofficial Mauritius trivia game
        </p>
      </footer>
    </div>
  )
}
