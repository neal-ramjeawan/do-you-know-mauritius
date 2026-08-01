import { useEffect, useState } from 'react'
import { DodoMark, Footprint, BadgeIcon } from './Marks.jsx'
import { getSavedName, submitScore } from '../lib/leaderboard.js'
import { recordRound } from '../lib/badges.js'
import ShareCard from './ShareCard.jsx'

function tierFor(pct) {
  if (pct === 100) return { title: 'Île Native', blurb: 'A perfect round. You know this island cold.' }
  if (pct >= 80) return { title: 'Seasoned Voyager', blurb: 'You\u2019ve clearly spent real time getting to know Mauritius.' }
  if (pct >= 60) return { title: 'Curious Traveller', blurb: 'A solid showing — a bit more exploring and you\u2019ll have it down.' }
  if (pct >= 40) return { title: 'Getting Your Bearings', blurb: 'You know the postcard version. Time to dig deeper.' }
  return { title: 'Fresh Off the Plane', blurb: 'Everyone starts somewhere — give it another go.' }
}

export default function ResultsScreen({
  answers,
  categoryId,
  categoryLabel,
  mode,
  isDaily,
  leaderboardCategoryId,
  onReplay,
  onChangeCategory,
  onHome,
  onViewLeaderboard,
}) {
  const total = answers.length
  const score = answers.filter((a) => a.correct).length
  const pct = Math.round((score / total) * 100)
  const tier = tierFor(pct)
  const missed = answers.filter((a) => !a.correct)

  const [name, setName] = useState(getSavedName())
  const [status, setStatus] = useState('idle') // idle | saving | saved
  const [newBadges, setNewBadges] = useState([])

  useEffect(() => {
    const { newlyEarned } = recordRound({ categoryId, mode, score, total, isDaily })
    setNewBadges(newlyEarned)
    // Only ever run once per results screen mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmitScore(e) {
    e.preventDefault()
    if (status === 'saving' || status === 'saved') return
    setStatus('saving')
    await submitScore({ categoryId: leaderboardCategoryId, name, score, total, mode })
    setStatus('saved')
  }

  return (
    <div className="px-5 sm:px-8 pt-6 pb-16 max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <DodoMark className="w-16 h-16 text-turmeric-400" />
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-lagoon-400">
          {categoryLabel} · round complete
        </p>
        <h2 className="mt-2 font-display text-4xl text-shell-100">
          {score} / {total}
        </h2>
        <p className="mt-3 font-display text-xl text-turmeric-300">{tier.title}</p>
        <p className="mt-1.5 text-shell-300/70 max-w-sm">{tier.blurb}</p>

        {newBadges.length > 0 && (
          <div className="mt-5 flex flex-col items-center gap-2" role="status">
            {newBadges.map((b) => (
              <div
                key={b.id}
                className="flex items-center gap-2 rounded-full border border-turmeric-500/30 bg-turmeric-500/10 pl-2.5 pr-4 py-1.5"
              >
                <BadgeIcon className="w-4 h-4" color="#e3a72b" />
                <span className="text-xs text-turmeric-300 font-semibold">Badge unlocked: {b.title}</span>
              </div>
            ))}
          </div>
        )}

        {status !== 'saved' ? (
          <form onSubmit={handleSubmitScore} className="mt-7 w-full max-w-xs">
            <label htmlFor="player-name" className="sr-only">
              Your name
            </label>
            <div className="flex items-center gap-2">
              <input
                id="player-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                maxLength={24}
                className="flex-1 rounded-full border border-shell-300/15 bg-depths-800/60 px-4 py-2.5 text-sm text-shell-100 placeholder:text-shell-300/30 focus:border-turmeric-500/50"
              />
              <button
                type="submit"
                disabled={status === 'saving'}
                className="flex-shrink-0 bg-lagoon-500 hover:bg-lagoon-400 text-depths-950 font-semibold text-sm px-4 py-2.5 rounded-full transition-colors disabled:opacity-60"
              >
                {status === 'saving' ? 'Saving…' : 'Save score'}
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={onViewLeaderboard}
            className="mt-7 inline-flex items-center gap-2 text-sm text-lagoon-400 hover:text-lagoon-300"
          >
            <Footprint className="w-4 h-4" />
            Score saved — view the leaderboard
          </button>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-2 bg-turmeric-500 hover:bg-turmeric-400 text-basalt font-semibold px-6 py-3 rounded-full transition-colors"
          >
            <Footprint className="w-4 h-4 rotate-90" />
            Play again
          </button>
          <button
            onClick={onChangeCategory}
            className="inline-flex items-center bg-depths-800 hover:bg-depths-700 border border-shell-300/15 text-shell-100 font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Choose another category
          </button>
        </div>
        <button onClick={onHome} className="mt-4 font-mono text-xs text-shell-300/40 hover:text-shell-300/70">
          Back to start
        </button>
      </div>

      <div className="mt-12">
        <h3 className="font-display text-xl text-shell-100 text-center sm:text-left">Share your result</h3>
        <div className="mt-4">
          <ShareCard score={score} total={total} tierTitle={tier.title} categoryLabel={categoryLabel} />
        </div>
      </div>

      {missed.length > 0 && (
        <div className="mt-14">
          <h3 className="font-display text-xl text-shell-100">Worth a second look</h3>
          <div className="mt-4 space-y-3">
            {missed.map((a, i) => (
              <div key={i} className="rounded-xl border border-shell-300/10 bg-depths-800/50 px-4 py-3.5">
                <p className="text-shell-100 leading-snug">{a.question.q}</p>
                <p className="mt-2 text-sm text-lagoon-400">
                  Correct: {a.question.options[a.question.answer]}
                </p>
                {a.question.fact && (
                  <p className="mt-1.5 text-sm text-shell-300/60 leading-relaxed">{a.question.fact}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
