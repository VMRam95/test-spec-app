import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

describe('Hero Section', () => {
  it('renders hero section with heading', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
  })

  it('displays call-to-action button', () => {
    render(<Hero />)
    const ctaButton = screen.getByRole('button')
    expect(ctaButton).toBeInTheDocument()
  })

  it('has accessible elements', () => {
    render(<Hero />)
    const mainSection = screen.getByRole('main')
    expect(mainSection).toHaveAttribute('aria-label')
  })
})