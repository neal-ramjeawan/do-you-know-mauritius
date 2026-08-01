import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import QuestionCard from '../components/QuestionCard.jsx'

const question = {
  id: 'test-1',
  category: 'history',
  difficulty: 'easy',
  q: 'What is the capital of Mauritius?',
  options: ['Port Louis', 'Curepipe', 'Rose Hill', 'Quatre Bornes'],
  answer: 0,
  fact: 'Port Louis is also the country\u2019s main port.',
}

function renderCard(props = {}) {
  const onSelect = vi.fn()
  render(
    <QuestionCard
      question={question}
      selected={null}
      onSelect={onSelect}
      questionNumber={1}
      totalQuestions={10}
      {...props}
    />,
  )
  return { onSelect }
}

describe('QuestionCard', () => {
  it('renders the question text and all four options', () => {
    renderCard()
    expect(screen.getByText(question.q)).toBeInTheDocument()
    for (const option of question.options) {
      expect(screen.getByText(option)).toBeInTheDocument()
    }
  })

  it('calls onSelect with the clicked option index', () => {
    const { onSelect } = renderCard()
    fireEvent.click(screen.getByText('Curepipe'))
    expect(onSelect).toHaveBeenCalledWith(1)
  })

  it('does not show the fact before an answer is selected', () => {
    renderCard()
    expect(screen.queryByText(question.fact)).not.toBeInTheDocument()
  })

  it('shows the fact and disables options once answered', () => {
    renderCard({ selected: 0 })
    expect(screen.getByText(question.fact)).toBeInTheDocument()
    for (const option of question.options) {
      expect(screen.getByText(option).closest('button')).toBeDisabled()
    }
  })

  it('marks the correct option as checked when selected matches answer', () => {
    renderCard({ selected: 0 })
    const correctButton = screen.getByText('Port Louis').closest('button')
    expect(correctButton).toHaveAttribute('aria-checked', 'true')
  })

  it('shows a time-out message when selected is -1', () => {
    renderCard({ selected: -1 })
    expect(screen.getByText(/time ran out/i)).toBeInTheDocument()
  })
})
