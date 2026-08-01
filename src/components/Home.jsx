import { DodoMark, Footprint, ClockIcon, BadgeIcon } from './Marks.jsx'
import { TOTAL_QUESTIONS, CATEGORIES } from '../data/questions.js'
import { hasPlayedDailyToday } from '../lib/badges.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Home({ onStart, onStartDaily, onViewBadges }) {
  const playedToday = hasPlayedDailyToday()
  const { t } = useLanguage()

  return (
    <div className="px-5 sm:px-8 pt-6 pb-16 max-w-3xl mx-auto">
      <div className="relative flex flex-col items-center text-center pt-8 pb-4">
        <div className="absolute -top-6 right-2 sm:right-10 opacity-20 rotate-12">
          <Footprint className="w-8 h-8 text-turmeric-400" />
        </div>
        <div className="absolute top-16 left-0 sm:left-4 opacity-10 -rotate-6">
          <Footprint className="w-6 h-6 text-lagoon-400" />
        </div>

        <DodoMark className="w-32 h-32 sm:w-40 sm:h-40 text-turmeric-400 drop-shadow-[0_0_40px_rgba(227,167,43,0.25)]" />

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-lagoon-400">
          {t('home.eyebrow')}
        </p>

        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-shell-100 text-balance leading-[1.1]">
          {t('home.titleLine1')}<br className="hidden sm:block" /> {t('home.titleLine2')}
        </h1>

        <p className="mt-4 max-w-md text-shell-300/80 leading-relaxed">
          {t('home.subtitle')}
        </p>

        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={onStart}
            className="group inline-flex items-center gap-3 bg-turmeric-500 hover:bg-turmeric-400 text-basalt font-body font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            {t('home.startQuiz')}
            <Footprint className="w-4 h-4 rotate-90 opacity-70 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={onViewBadges}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-shell-300/50 hover:text-turmeric-400 transition-colors underline underline-offset-4 decoration-shell-300/20"
          >
            <BadgeIcon className="w-3.5 h-3.5" />
            {t('home.badges')}
          </button>
        </div>

        <div className="mt-10 flex items-center gap-6 font-mono text-xs text-shell-300/60">
          <span>{t('home.statQuestions')}</span>
          <span className="w-1 h-1 rounded-full bg-shell-300/30" />
          <span>{t('home.statCategories')}</span>
          <span className="w-1 h-1 rounded-full bg-shell-300/30" />
          <span>{t('home.statFree')}</span>
        </div>
      </div>

      <button
        onClick={onStartDaily}
        className="mt-10 w-full text-left rounded-2xl border border-lagoon-500/30 bg-lagoon-500/10 hover:bg-lagoon-500/15 transition-colors px-5 py-4 flex items-center justify-between"
      >
        <div>
          <p className="font-display text-lg text-lagoon-300">
            {t('common.dailyChallenge')}
            {playedToday && t('home.dailyChallengeDone')}
          </p>
          <p className="text-sm text-shell-300/60 mt-0.5">
            {t('home.dailyChallengeBlurb')}
          </p>
        </div>
        <ClockIcon className="w-5 h-5 text-lagoon-400 flex-shrink-0" />
      </button>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="rounded-xl border border-shell-300/10 bg-depths-800/50 px-3.5 py-3"
          >
            <p className="font-display text-sm text-shell-100">{t(`categories.${cat.id}.label`)}</p>
            <p className="mt-0.5 text-xs text-shell-300/50">{t(`categories.${cat.id}.tagline`)}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-shell-300/40 leading-relaxed">
        {t('home.footerNote')}
      </p>
    </div>
  )
}
