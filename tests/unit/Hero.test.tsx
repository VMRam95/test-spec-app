import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Hero } from '@/components/Hero'

describe('Hero', () => {
  describe('Rendering', () => {
    it('should render the hero section with all elements', () => {
      render(<Hero />)
      
      expect(screen.getByText(/welcome to/i)).toBeInTheDocument()
      expect(screen.getByText(/simple landing/i)).toBeInTheDocument()
      expect(screen.getByText(/build beautiful, responsive websites/i)).toBeInTheDocument()
    })

    it('should render call-to-action buttons', () => {
      render(<Hero />)
      
      expect(screen.getByRole('button', { name: /explore features/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument()
    })

    it('should have correct CSS classes for animations', () => {
      render(<Hero />)
      
      const heading = screen.getByText(/welcome to/i).parentElement
      const description = screen.getByText(/build beautiful, responsive websites/i)
      const buttonContainer = screen.getByRole('button', { name: /explore features/i }).parentElement
      
      expect(heading).toHaveClass('animate-fade-in')
      expect(description).toHaveClass('animate-slide-up')
      expect(buttonContainer).toHaveClass('animate-slide-up')
    })

    it('should render gradient background elements', () => {
      const { container } = render(<Hero />)
      
      const gradientElement = container.querySelector('.bg-gradient-to-br')
      expect(gradientElement).toBeInTheDocument()
      expect(gradientElement).toHaveClass('from-primary-50', 'to-primary-100')
    })

    it('should render decorative SVG wave', () => {
      const { container } = render(<Hero />)
      
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('viewBox', '0 0 1440 100')
    })
  })

  describe('Interactions', () => {
    it('should scroll to features section when Explore Features is clicked', async () => {
      const mockScrollIntoView = vi.fn()
      const mockGetElementById = vi.fn().mockReturnValue({
        scrollIntoView: mockScrollIntoView
      })
      
      vi.spyOn(document, 'getElementById').mockImplementation(mockGetElementById)
      
      const user = userEvent.setup()
      render(<Hero />)
      
      const exploreButton = screen.getByRole('button', { name: /explore features/i })
      await user.click(exploreButton)
      
      expect(mockGetElementById).toHaveBeenCalledWith('features')
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('should scroll to contact section when Get Started is clicked', async () => {
      const mockScrollIntoView = vi.fn()
      const mockGetElementById = vi.fn().mockReturnValue({
        scrollIntoView: mockScrollIntoView
      })
      
      vi.spyOn(document, 'getElementById').mockImplementation(mockGetElementById)
      
      const user = userEvent.setup()
      render(<Hero />)
      
      const getStartedButton = screen.getByRole('button', { name: /get started/i })
      await user.click(getStartedButton)
      
      expect(mockGetElementById).toHaveBeenCalledWith('contact')
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('should handle missing section elements gracefully', async () => {
      vi.spyOn(document, 'getElementById').mockReturnValue(null)
      
      const user = userEvent.setup()
      render(<Hero />)
      
      const exploreButton = screen.getByRole('button', { name: /explore features/i })
      
      // Should not throw error when element is not found
      await expect(user.click(exploreButton)).resolves.not.toThrow()
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive text sizes', () => {
      render(<Hero />)
      
      const heading = screen.getByText(/welcome to/i).parentElement
      expect(heading).toHaveClass('text-5xl', 'md:text-6xl', 'lg:text-7xl')
      
      const description = screen.getByText(/build beautiful, responsive websites/i)
      expect(description).toHaveClass('text-xl', 'md:text-2xl')
    })

    it('should have responsive button layout', () => {
      render(<Hero />)
      
      const buttonContainer = screen.getByRole('button', { name: /explore features/i }).parentElement
      expect(buttonContainer).toHaveClass('flex', 'flex-col', 'sm:flex-row')
    })

    it('should have responsive padding', () => {
      const { container } = render(<Hero />)
      
      const section = container.querySelector('section')
      expect(section).toHaveClass('py-32', 'px-4')
    })
  })

  describe('Dark Mode Support', () => {
    it('should have dark mode classes', () => {
      const { container } = render(<Hero />)
      
      const gradientElement = container.querySelector('.bg-gradient-to-br')
      expect(gradientElement).toHaveClass('dark:from-gray-800', 'dark:to-gray-900')
      
      const heading = screen.getByText(/simple landing/i)
      expect(heading).toHaveClass('dark:text-white')
      
      const description = screen.getByText(/build beautiful, responsive websites/i)
      expect(description).toHaveClass('dark:text-gray-300')
    })
  })
})