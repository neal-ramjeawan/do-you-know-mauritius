const LETTERS = ['A', 'B', 'C', 'D']

const DIFFICULTY_STYLES = {
  easy: 'text-lagoon-400 border-lagoon-500/30',
  medium: 'text-turmeric-400 border-turmeric-500/30',
  hard: 'text-coral-400 border-coral-500/30',
}

export default function QuestionCard({ question, selected, onSelect, questionNumber, totalQuestions }) {
  const answered = selected !== null
  const timedOut = selected === -1

  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-xs text-shell-300/40">
          Question {questionNumber} of {totalQuestions}
        </span>
        {question.difficulty && (
          <span
            className={`text-[10px] uppercase tracking-wide font-mono px-2 py-0.5 rounded-full border ${
              DIFFICULTY_STYLES[question.difficulty] || 'text-shell-300/50 border-shell-300/20'
            }`}
          >
            {question.difficulty}
          </span>
        )}
      </div>

      <p className="mt-2 font-display text-2xl sm:text-3xl leading-snug text-shell-100 text-balance">
        {question.q}
      </p>

      <div role="radiogroup" aria-label={`Answer options for question ${questionNumber}`} className="mt-6 space-y-2.5">
        {question.options.map((option, i) => {
          const isCorrect = i === question.answer
          const isSelected = i === selected

          let stateClasses = 'border-shell-300/15 bg-depths-800/60 hover:border-lagoon-500/40'
          if (answered && isCorrect) {
            stateClasses = 'border-lagoon-500 bg-lagoon-500/15'
          } else if (answered && isSelected && !isCorrect) {
            stateClasses = 'border-coral-500 bg-coral-500/15'
          } else if (answered) {
            stateClasses = 'border-shell-300/10 bg-depths-800/30 opacity-50'
          }

          return (
            <button
              key={i}
              role="radio"
              aria-checked={isSelected}
              disabled={answered}
              onClick={() => onSelect(i)}
              className={`w-full text-left rounded-xl border px-4 py-3.5 flex items-center gap-3.5 transition-colors duration-200 disabled:cursor-default ${stateClasses}`}
            >
              <span className="font-mono text-xs text-shell-300/40 w-4 flex-shrink-0" aria-hidden="true">
                {LETTERS[i]}
              </span>
              <span className="text-shell-100 leading-snug">{option}</span>
              {answered && isCorrect && (
                <span className="ml-auto text-lagoon-400 flex-shrink-0" aria-hidden="true">✓</span>
              )}
              {answered && isSelected && !isCorrect && (
                <span className="ml-auto text-coral-500 flex-shrink-0" aria-hidden="true">✕</span>
              )}
            </button>
          )
        })}
      </div>

      {timedOut && (
        <p className="mt-4 text-sm text-coral-400">Time ran out on that one.</p>
      )}

      {answered && question.fact && (
        <p className="mt-5 text-sm text-shell-300/70 leading-relaxed border-l-2 border-turmeric-500/40 pl-3.5">
          {question.fact}
        </p>
      )}
    </div>
  )
}
