import { useEffect, useState } from 'react'
import { DodoMark, Footprint, BadgeIcon } from './Marks.jsx'
import { recordRound } from '../lib/badges.js'
import ShareCard from './ShareCard.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

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
  onReplay,
  onChangeCategory,
  onHome,
}) {
  const { t } = useLanguage()
  const total = answers.length
  const score = answers.filter((a) => a.correct).length
  const pct = Math.round((score / total) * 100)
  const tier = tierFor(pct)
  const missed = answers.filter((a) => !a.correct)

  const [newBadges, setNewBadges] = useState([])

  useEffect(() => {
    const { newlyEarned } = recordRound({ categoryId, mode, score, total, isDaily })
    setNewBadges(newlyEarned)
    // Only ever run once per results screen mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="px-5 sm:px-8 pt-6 pb-16 max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <DodoMark className="w-16 h-16 text-turmeric-400" />
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-lagoon-400">
          {categoryLabel} {t('results.roundComplete')}
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
                <span className="text-xs text-turmeric-300 font-semibold">{t('results.badgeUnlockedPrefix')}{b.title}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-2 bg-turmeric-500 hover:bg-turmeric-400 text-basalt font-semibold px-6 py-3 rounded-full transition-colors"
          >
            <Footprint className="w-4 h-4 rotate-90" />
            {t('results.playAgain')}
          </button>
          <button
            onClick={onChangeCategory}
            className="inline-flex items-center bg-depths-800 hover:bg-depths-700 border border-shell-300/15 text-shell-100 font-semibold px-6 py-3 rounded-full transition-colors"
          >
            {t('results.chooseAnotherCategory')}
          </button>
        </div>
        <button onClick={onHome} className="mt-4 font-mono text-xs text-shell-300/40 hover:text-shell-300/70">
          {t('results.backToStart')}
        </button>
      </div>

      <div className="mt-12">
        <h3 className="font-display text-xl text-shell-100 text-center sm:text-left">{t('results.shareYourResult')}</h3>
        <div className="mt-4">
          <ShareCard score={score} total={total} tierTitle={tier.title} categoryLabel={categoryLabel} />
        </div>
      </div>

      {missed.length > 0 && (
        <div className="mt-14">
          <h3 className="font-display text-xl text-shell-100">{t('results.worthASecondLook')}</h3>
          <div className="mt-4 space-y-3">
            {missed.map((a, i) => (
              <div key={i} className="rounded-xl border border-shell-300/10 bg-depths-800/50 px-4 py-3.5">
                <p className="text-shell-100 leading-snug">{a.question.q}</p>
                <p className="mt-2 text-sm text-lagoon-400">
                  {t('results.correctPrefix')}{a.question.options[a.question.answer]}
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
