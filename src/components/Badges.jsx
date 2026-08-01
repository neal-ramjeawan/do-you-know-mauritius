import { BADGES, readBadgeState } from '../lib/badges.js'
import { BadgeIcon } from './Marks.jsx'

export default function Badges({ onBack }) {
  const state = readBadgeState()

  return (
    <div className="px-5 sm:px-8 pt-6 pb-16 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl text-shell-100">Badges</h2>
        <button onClick={onBack} className="font-mono text-xs text-shell-300/40 hover:text-shell-300/70">
          Back
        </button>
      </div>
      <p className="mt-2 text-sm text-shell-300/60">
        {state.earned.length} of {BADGES.length} earned
        {state.dailyStreak.count > 0 && ` · daily streak: ${state.dailyStreak.count}`}
      </p>

      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        {BADGES.map((badge) => {
          const earned = state.earned.includes(badge.id)
          return (
            <div
              key={badge.id}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 ${
                earned ? 'border-turmeric-500/30 bg-turmeric-500/10' : 'border-shell-300/10 bg-depths-800/40'
              }`}
            >
              <BadgeIcon
                className="w-6 h-6 flex-shrink-0 mt-0.5"
                color={earned ? '#e3a72b' : 'currentColor'}
                locked={!earned}
              />
              <div>
                <p className={`font-display ${earned ? 'text-turmeric-300' : 'text-shell-300/60'}`}>
                  {badge.title}
                </p>
                <p className="text-xs text-shell-300/50 mt-0.5">{badge.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
