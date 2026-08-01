import { DodoMark } from './Marks.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Header({ onHome }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <header className="flex items-center justify-between px-5 py-4 sm:px-8">
      <button
        onClick={onHome}
        className="flex items-center gap-2 text-shell-200 hover:text-turmeric-400 transition-colors"
      >
        <DodoMark className="w-8 h-8" color="currentColor" />
        <span className="font-display text-lg tracking-tight">Zwazo</span>
      </button>

      <div className="flex items-center gap-3">
        <span className="hidden sm:block font-mono text-xs uppercase tracking-[0.2em] text-shell-300/50">
          {t('header.subtitle')}
        </span>

        <div
          role="group"
          aria-label={t('languageToggle.ariaLabel')}
          className="flex items-center gap-1 rounded-full border border-shell-300/15 bg-depths-800/60 p-1"
        >
          {['en', 'fr'].map((option) => {
            const active = option === lang
            return (
              <button
                key={option}
                type="button"
                onClick={() => setLang(option)}
                aria-pressed={active}
                className={`rounded-full px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] transition-colors ${
                  active
                    ? 'bg-turmeric-500 text-basalt'
                    : 'text-shell-300/70 hover:text-shell-100'
                }`}
              >
                {option.toUpperCase()}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
