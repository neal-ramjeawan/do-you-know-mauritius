import { DodoMark, Footprint } from './Marks.jsx'

// Horizontal footprint trail as the round's progress indicator. Filled
// steps = answered questions; dodo icon marks the current question.
export default function ProgressTrail({ total, current }) {
  return (
    <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => {
        const isPast = i < current
        const isNow = i === current
        return (
          <span key={i} className="relative flex-shrink-0">
            {isNow && (
              <DodoMark
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-6 text-turmeric-400"
              />
            )}
            <Footprint
              className={
                'w-3.5 h-3.5 sm:w-4 sm:h-4 -rotate-90 transition-colors duration-300 ' +
                (isPast || isNow ? 'text-turmeric-400' : 'text-shell-300/15')
              }
            />
          </span>
        )
      })}
    </div>
  )
}
