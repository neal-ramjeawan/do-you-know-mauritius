import { useState } from 'react'
import { CATEGORIES, QUESTIONS, DIFFICULTIES } from '../data/questions.js'
import { Footprint, ClockIcon } from './Marks.jsx'

function countFor(catId, difficulty) {
  return QUESTIONS.filter(
    (q) => q.category === catId && (difficulty === 'all' || q.difficulty === difficulty),
  ).length
}

export default function CategorySelect({ onPick }) {
  const [mode, setMode] = useState('classic')
  const [difficulty, setDifficulty] = useState('all')

  return (
    <div className="px-5 sm:px-8 pt-6 pb-16 max-w-3xl mx-auto">
      <h2 className="font-display text-3xl text-shell-100">Pick a category</h2>
      <p className="mt-2 text-shell-300/70">
        Each round is a short walk down the trail — 10 questions, answer as many as you can.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <div role="radiogroup" aria-label="Round mode" className="flex rounded-full border border-shell-300/15 p-1">
          {[
            { id: 'classic', label: 'Classic' },
            { id: 'speed', label: 'Speed' },
          ].map((m) => (
            <button
              key={m.id}
              role="radio"
              aria-checked={mode === m.id}
              onClick={() => setMode(m.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body transition-colors ${
                mode === m.id ? 'bg-turmeric-500 text-basalt font-semibold' : 'text-shell-300/60 hover:text-shell-100'
              }`}
            >
              {m.id === 'speed' && <ClockIcon className="w-3.5 h-3.5" />}
              {m.label}
            </button>
          ))}
        </div>

        <div role="radiogroup" aria-label="Difficulty" className="flex rounded-full border border-shell-300/15 p-1">
          {[{ id: 'all', label: 'All levels' }, ...DIFFICULTIES].map((d) => (
            <button
              key={d.id}
              role="radio"
              aria-checked={difficulty === d.id}
              onClick={() => setDifficulty(d.id)}
              className={`px-3.5 py-2 rounded-full text-sm font-body transition-colors ${
                difficulty === d.id ? 'bg-lagoon-500 text-depths-950 font-semibold' : 'text-shell-300/60 hover:text-shell-100'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {mode === 'speed' && (
        <p className="mt-3 text-xs text-shell-300/50">
          Speed mode: 15 seconds per question. Run out of time and it counts as missed.
        </p>
      )}

      <button
        onClick={() => onPick('all', { mode, difficulty })}
        className="mt-6 w-full text-left rounded-2xl border border-turmeric-500/30 bg-turmeric-500/10 hover:bg-turmeric-500/15 transition-colors px-5 py-4 flex items-center justify-between"
      >
        <div>
          <p className="font-display text-lg text-turmeric-300">All Categories</p>
          <p className="text-sm text-shell-300/60 mt-0.5">A mixed round pulling from every topic</p>
        </div>
        <Footprint className="w-5 h-5 text-turmeric-400" />
      </button>

      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => {
          const available = countFor(cat.id, difficulty)
          const disabled = available === 0
          return (
            <button
              key={cat.id}
              disabled={disabled}
              onClick={() => onPick(cat.id, { mode, difficulty })}
              className={`text-left rounded-2xl border px-5 py-4 transition-colors ${
                disabled
                  ? 'border-shell-300/5 bg-depths-800/20 opacity-40 cursor-not-allowed'
                  : 'border-shell-300/10 bg-depths-800/60 hover:border-lagoon-500/40 hover:bg-depths-700/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-display text-lg text-shell-100">{cat.label}</p>
                <span className="font-mono text-[11px] text-shell-300/40">{available}</span>
              </div>
              <p className="text-sm text-shell-300/60 mt-0.5">{cat.tagline}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
