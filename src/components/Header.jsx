import { DodoMark } from './Marks.jsx'

export default function Header({ onHome }) {
  return (
    <header className="flex items-center justify-between px-5 py-4 sm:px-8">
      <button
        onClick={onHome}
        className="flex items-center gap-2 text-shell-200 hover:text-turmeric-400 transition-colors"
      >
        <DodoMark className="w-8 h-8" color="currentColor" />
        <span className="font-display text-lg tracking-tight">Zwazo</span>
      </button>
      <span className="hidden sm:block font-mono text-xs uppercase tracking-[0.2em] text-shell-300/50">
        Mauritius Trivia
      </span>
    </header>
  )
}
