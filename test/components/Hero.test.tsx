import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Hero from '@/components/Hero'

describe('Hero', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Hero />)
      
      expect(screen.getByText('Build')).toBeInTheDocument()
      expect(screen.getByText('Something Amazing')).toBeInTheDocument()
      expect(screen.getByText(/Create beautiful, responsive web applications/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument()
    })

    it('renders with custom props', () => {
      render(
        <Hero
          title="Custom Title Here"
          subtitle="Custom subtitle text"
          ctaText="Custom CTA"
          ctaSecondaryText="Custom Secondary"
        />
      )
      
      expect(screen.getByText('Custom')).toBeInTheDocument()
      expect(screen.getByText('Title Here')).toBeInTheDocument()
      expect(screen.getByText('Custom subtitle text')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /custom cta/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /custom secondary/i })).toBeInTheDocument()
    })

    it('splits title text correctly for gradient effect', () => {
      render(<Hero title="Build Something Amazing" />)
      
      const firstWord = screen.getByText('Build')
      const restOfTitle = screen.getByText('Something Amazing')
      
      expect(firstWord).toBeInTheDocument()
      expect(restOfTitle).toHaveClass('bg-gradient-to-r')
      expect(restOfTitle).toHaveClass('bg-clip-text')
      expect(restOfTitle).toHaveClass('text-transparent')
    })
  })

  describe('Interactions', () => {
    it('calls onCtaClick when primary button is clicked', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(<Hero onCtaClick={handleClick} />)
      
      const primaryButton = screen.getByRole('button', { name: /get started/i })
      await user.click(primaryButton)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('calls onCtaSecondaryClick when secondary button is clicked', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(<Hero onCtaSecondaryClick={handleClick} />)
      
      const secondaryButton = screen.getByRole('button', { name: /learn more/i })
      await user.click(secondaryButton)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles keyboard navigation correctly', async () => {
      const handlePrimaryClick = vi.fn()
      const handleSecondaryClick = vi.fn()
      const user = userEvent.setup()
      
      render(
        <Hero 
          onCtaClick={handlePrimaryClick}
          onCtaSecondaryClick={handleSecondaryClick}
        />
      )
      
      // Tab to first button
      await user.tab()
      expect(screen.getByRole('button', { name: /get started/i })).toHaveFocus()
      
      // Press Enter
      await user.keyboard('{Enter}')
      expect(handlePrimaryClick).toHaveBeenCalledTimes(1)
      
      // Tab to second button
      await user.tab()
      expect(screen.getByRole('button', { name: /learn more/i })).toHaveFocus()
      
      // Press Space
      await user.keyboard(' ')
      expect(handleSecondaryClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Responsive Design', () => {
    it('has responsive text size classes', () => {
      render(<Hero />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-4xl')
      expect(heading).toHaveClass('sm:text-6xl')
      expect(heading).toHaveClass('lg:text-7xl')
    })

    it('has responsive padding classes', () => {
      render(<Hero />)
      
      const container = screen.getByText(/create beautiful/i).closest('.max-w-7xl')
      expect(container).toHaveClass('px-4')
      expect(container).toHaveClass('sm:px-6')
      expect(container).toHaveClass('lg:px-8')
    })

    it('has responsive button layout', () => {
      render(<Hero />)
      
      const buttonContainer = screen.getByRole('button', { name: /get started/i }).closest('.flex')
      expect(buttonContainer).toHaveClass('flex-col')
      expect(buttonContainer).toHaveClass('sm:flex-row')
    })

    it('buttons have responsive width classes', () => {
      render(<Hero />)
      
      const primaryButton = screen.getByRole('button', { name: /get started/i })
      const secondaryButton = screen.getByRole('button', { name: /learn more/i })
      
      expect(primaryButton).toHaveClass('w-full')
      expect(primaryButton).toHaveClass('sm:w-auto')
      expect(secondaryButton).toHaveClass('w-full')
      expect(secondaryButton).toHaveClass('sm:w-auto')
    })
  })

  describe('Dark Mode Support', () => {
    it('has dark mode gradient background', () => {
      render(<Hero />)
      
      const section = document.querySelector('section')
      expect(section).toHaveClass('dark:from-gray-900')
      expect(section).toHaveClass('dark:to-gray-800')
    })

    it('has dark mode text colors', () => {
      render(<Hero />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      const subtitle = screen.getByText(/create beautiful/i)
      
      expect(heading).toHaveClass('dark:text-white')
      expect(subtitle).toHaveClass('dark:text-gray-300')
    })

    it('has dark mode gradient text colors', () => {
      render(<Hero title="Build Something Amazing" />)
      
      const gradientText = screen.getByText('Something Amazing')
      expect(gradientText).toHaveClass('dark:from-blue-400')
      expect(gradientText).toHaveClass('dark:to-indigo-400')
    })

    it('secondary button has dark mode styles', () => {
      render(<Hero />)
      
      const secondaryButton = screen.getByRole('button', { name: /learn more/i })
      expect(secondaryButton).toHaveClass('dark:border-gray-600')
      expect(secondaryButton).toHaveClass('dark:text-gray-300')
      expect(secondaryButton).toHaveClass('dark:hover:bg-gray-800')
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<Hero />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveAttribute('id', 'hero-title')
    })

    it('section has proper aria-labelledby', () => {
      render(<Hero />)
      
      const section = document.querySelector('section[aria-labelledby="hero-title"]')
      expect(section).toBeInTheDocument()
    })

    it('buttons have descriptive aria-labels', () => {
      render(<Hero ctaText="Start Now" ctaSecondaryText="Read Docs" />)
      
      const primaryButton = screen.getByRole('button', { name: /start now.*primary action/i })
      const secondaryButton = screen.getByRole('button', { name: /read docs.*secondary action/i })
      
      expect(primaryButton).toBeInTheDocument()
      expect(secondaryButton).toBeInTheDocument()
    })

    it('maintains focus visibility', () => {
      render(<Hero />)
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        // Buttons should have focus-visible styles
        expect(button.className).toContain('transition')
      })
    })
  })

  describe('Visual Effects', () => {
    it('has hover effects on primary button', () => {
      render(<Hero />)
      
      const primaryButton = screen.getByRole('button', { name: /get started/i })
      expect(primaryButton).toHaveClass('hover:from-blue-700')
      expect(primaryButton).toHaveClass('hover:to-indigo-700')
      expect(primaryButton).toHaveClass('hover:shadow-xl')
      expect(primaryButton).toHaveClass('hover:-translate-y-0.5')
    })

    it('has transition animations', () => {
      render(<Hero />)
      
      const section = document.querySelector('section')
      const primaryButton = screen.getByRole('button', { name: /get started/i })
      
      expect(section).toHaveClass('transition-colors')
      expect(section).toHaveClass('duration-200')
      expect(primaryButton).toHaveClass('transition-all')
      expect(primaryButton).toHaveClass('duration-200')
    })

    it('has decorative elements', () => {
      render(<Hero />)
      
      // Check for grid background
      const gridBackground = document.querySelector('.bg-grid-gray-100')
      expect(gridBackground).toBeInTheDocument()
      
      // Check for bottom border gradient
      const bottomBorder = document.querySelector('.h-px.bg-gradient-to-r')
      expect(bottomBorder).toBeInTheDocument()
    })
  })
})