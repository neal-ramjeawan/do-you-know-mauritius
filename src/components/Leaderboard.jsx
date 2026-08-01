import { useEffect, useRef, useState } from 'react'
import { CATEGORIES } from '../data/questions.js'
import { getTopScores } from '../lib/leaderboard.js'
import { todayKey } from '../lib/dailyChallenge.js'
import { Footprint, ClockIcon } from './Marks.jsx'

const DAILY_ID = `daily-${todayKey()}`

const TABS = [
  { id: 'all', label: 'All Categories' },
  { id: DAILY_ID, label: 'Daily Challenge' },
  ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
]

export default function Leaderboard({ initialCategory = 'all', onBack }) {
  const [activeTab, setActiveTab] = useState(initialCategory)
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const tabRefs = useRef([])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getTopScores(activeTab, 10).then((rows) => {
      if (!cancelled) {
        setScores(rows)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [activeTab])

  function handleTabKeyDown(e, i) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const dir = e.key === 'ArrowRight' ? 1 : -1
    const nextIndex = (i + dir + TABS.length) % TABS.length
    setActiveTab(TABS[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="px-5 sm:px-8 pt-6 pb-16 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl text-shell-100">Leaderboard</h2>
        <button onClick={onBack} className="font-mono text-xs text-shell-300/40 hover:text-shell-300/70">
          Back
        </button>
      </div>
      <p className="mt-2 text-sm text-shell-300/60">
        Synced across every player when the leaderboard API is reachable;
        saved on this device only when it isn't. No account needed either
        way.
      </p>

      <div role="tablist" aria-label="Leaderboard category" className="mt-5 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[i] = el)}
            role="tab"
            aria-selected={activeTab === tab.id}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onKeyDown={(e) => handleTabKeyDown(e, i)}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 font-mono text-xs px-3.5 py-2 rounded-full border transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-turmeric-500 bg-turmeric-500/15 text-turmeric-300'
                : 'border-shell-300/15 text-shell-300/50 hover:text-shell-300/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-6 space-y-2">
        {loading && <p className="text-sm text-shell-300/50">Loading scores…</p>}

        {!loading && scores.length === 0 && (
          <div className="flex flex-col items-center text-center py-10">
            <Footprint className="w-6 h-6 text-shell-300/20 mb-3" />
            <p className="text-sm text-shell-300/50">
              No scores yet for this category — be the first to set one.
            </p>
          </div>
        )}

        {!loading &&
          scores.map((entry, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-shell-300/10 bg-depths-800/50 px-4 py-3"
            >
              <span className="font-mono text-sm w-6 text-center text-turmeric-400">{i + 1}</span>
              <span className="flex-1 text-shell-100 truncate">{entry.name}</span>
              {entry.mode === 'speed' && <ClockIcon className="w-3.5 h-3.5 text-shell-300/40" />}
              <span className="font-mono text-sm text-lagoon-400">
                {entry.score}/{entry.total}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
