import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QuestsPage } from './QuestsPage'
import { BrowserRouter } from 'react-router-dom'

describe('QuestsPage', () => {
  it('renders heading and add button', () => {
    render(
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <QuestsPage />
      </BrowserRouter>
    )
    expect(screen.getByText('Quests')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Добавить' })).toBeInTheDocument()
  })
})
