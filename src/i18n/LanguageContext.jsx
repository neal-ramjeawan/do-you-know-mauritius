import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { STRINGS } from './strings.js'

const LANG_KEY = 'zwazo-lang'
const LanguageContext = createContext(null)

const fallbackLanguageContext = {
  lang: 'en',
  setLang: () => {},
  t: (path) => lookup(STRINGS.en, path) ?? path,
}

function getInitialLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved === 'en' || saved === 'fr') return saved
  } catch {
    // ignore — private browsing or storage disabled
  }
  return 'en'
}

function lookup(table, path) {
  let node = table
  for (const key of path.split('.')) {
    node = node?.[key]
  }
  return node
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  const setLang = useCallback((next) => {
    setLangState(next)
    try {
      localStorage.setItem(LANG_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  // Missing key in the active language falls back to English rather than
  // rendering blank — matters most for partial/future translations.
  const t = useCallback(
    (path) => {
      const value = lookup(STRINGS[lang], path)
      if (value !== undefined) return value
      return lookup(STRINGS.en, path) ?? path
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  return ctx ?? fallbackLanguageContext
}
