import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../i18n/LanguageContext.jsx'
import Home from './Home.jsx'

describe('Home language toggle', () => {
  it('exposes the language switch on the landing screen', () => {
    render(
      <LanguageProvider>
        <Home
          onStart={() => {}}
          onStartDaily={() => {}}
          onViewBadges={() => {}}
        />
      </LanguageProvider>,
    )

    expect(screen.getByRole('group', { name: /language/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'FR' })).toBeInTheDocument()
  })
})
