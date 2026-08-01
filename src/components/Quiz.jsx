import { useEffect, useRef, useState } from 'react'
import ProgressTrail from './ProgressTrail.jsx'
import QuestionCard from './QuestionCard.jsx'
import { ClockIcon } from './Marks.jsx'

const SPEED_SECONDS = 15

export default function Quiz({ round, categoryLabel, mode, onFinish, onQuit }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [secondsLeft, setSecondsLeft] = useState(SPEED_SECONDS)
  const nextButtonRef = useRef(null)
  const liveRegionRef = useRef(null)

  const question = round[index]
  const isLast = index === round.length - 1
  const timed = mode === 'speed'

  // Reset the timer each time we move to a new question.
  useEffect(() => {
    if (!timed) return
    setSecondsLeft(SPEED_SECONDS)
  }, [index, timed])

  // Countdown — locks in "no answer" if time runs out.
  useEffect(() => {
    if (!timed || selected !== null) return
    if (secondsLeft <= 0) {
      setSelected(-1)
      return
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timed, secondsLeft, selected])

  // Move focus to the Next button once an answer is locked in, so
  // keyboard and screen-reader users land straight on the next action.
  useEffect(() => {
    if (selected !== null && nextButtonRef.current) {
      nextButtonRef.current.focus()
    }
  }, [selected])

  function handleSelect(i) {
    if (selected !== null) return
    setSelected(i)
  }

  function handleNext() {
    const record = {
      question,
      chosenIndex: selected,
      correct: selected === question.answer,
    }
    const nextAnswers = [...answers, record]

    if (isLast) {
      onFinish(nextAnswers)
      return
    }
    setAnswers(nextAnswers)
    setSelected(null)
    setIndex(index + 1)
  }

  return (
    <div className="px-5 sm:px-8 pt-6 pb-16 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-xs uppercase tracking-widest text-shell-300/50">
          {categoryLabel}
          {timed && ' · Speed'}
        </span>
        <button onClick={onQuit} className="font-mono text-xs text-shell-300/40 hover:text-shell-300/70">
          Quit
        </button>
      </div>

      <div className="mt-5 mb-3 flex items-center justify-between gap-4">
        <ProgressTrail total={round.length} current={index} />
        {timed && (
          <div
            className={`flex-shrink-0 flex items-center gap-1.5 font-mono text-sm ${
              secondsLeft <= 5 ? 'text-coral-500' : 'text-lagoon-400'
            }`}
            role="timer"
            aria-live="off"
          >
            <ClockIcon className="w-4 h-4" />
            {Math.max(secondsLeft, 0)}s
          </div>
        )}
      </div>

      <div ref={liveRegionRef} aria-live="polite" className="sr-only">
        {selected !== null &&
          (selected === question.answer
            ? 'Correct.'
            : selected === -1
              ? `Time\u2019s up. The correct answer was ${question.options[question.answer]}.`
              : `Incorrect. The correct answer was ${question.options[question.answer]}.`)}
      </div>

      <QuestionCard question={question} selected={selected} onSelect={handleSelect} questionNumber={index + 1} totalQuestions={round.length} />

      {selected !== null && (
        <button
          ref={nextButtonRef}
          onClick={handleNext}
          className="mt-7 w-full sm:w-auto inline-flex justify-center items-center bg-turmeric-500 hover:bg-turmeric-400 text-basalt font-semibold px-6 py-3 rounded-full transition-colors"
        >
          {isLast ? 'See results' : 'Next question'}
        </button>
      )}
    </div>
  )
}
