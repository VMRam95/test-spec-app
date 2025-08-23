import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Hero from '@/components/Hero'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn()

describe('Hero', () => {
  it('renders hero section with all elements', () => {
    render(<Hero />)
    
    // Check main heading
    expect(screen.getByText('Build Something')).toBeInTheDocument()
    expect(screen.getByText('Amazing Today')).toBeInTheDocument()
    
    // Check subtitle
    expect(screen.getByText(/Create beautiful, responsive web applications/i)).toBeInTheDocument()
    
    // Check CTA buttons
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument()
    
    // Check announcement badge
    expect(screen.getByText('New features available now')).toBeInTheDocument()
    expect(screen.getByText('NEW')).toBeInTheDocument()
  })

  it('renders all benefit items', () => {
    render(<Hero />)
    
    expect(screen.getByText('No credit card required')).toBeInTheDocument()
    expect(screen.getByText('14-day free trial')).toBeInTheDocument()
    expect(screen.getByText('Cancel anytime')).toBeInTheDocument()
  })

  it('renders trust indicators', () => {
    render(<Hero />)
    
    expect(screen.getByText('Trusted by teams at')).toBeInTheDocument()
    
    // Check for company placeholders
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(`Company ${i}`)).toBeInTheDocument()
    }
  })

  it('scrolls to contact section when Get Started is clicked', async () => {
    const user = userEvent.setup()
    
    // Create mock contact section
    const contactSection = document.createElement('div')
    contactSection.id = 'contact'
    document.body.appendChild(contactSection)
    
    // Mock querySelector
    const originalQuerySelector = document.querySelector
    document.querySelector = vi.fn((selector) => {
      if (selector === '#contact') return contactSection
      return originalQuerySelector.call(document, selector)
    })
    
    render(<Hero />)
    
    const getStartedButton = screen.getByRole('button', { name: /get started/i })
    await user.click(getStartedButton)
    
    expect(contactSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    
    // Cleanup
    document.body.removeChild(contactSection)
    document.querySelector = originalQuerySelector
  })

  it('scrolls to features section when Learn More is clicked', async () => {
    const user = userEvent.setup()
    
    // Create mock features section
    const featuresSection = document.createElement('div')
    featuresSection.id = 'features'
    document.body.appendChild(featuresSection)
    
    // Mock querySelector
    const originalQuerySelector = document.querySelector
    document.querySelector = vi.fn((selector) => {
      if (selector === '#features') return featuresSection
      return originalQuerySelector.call(document, selector)
    })
    
    render(<Hero />)
    
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i })
    await user.click(learnMoreButton)
    
    expect(featuresSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    
    // Cleanup
    document.body.removeChild(featuresSection)
    document.querySelector = originalQuerySelector
  })

  it('renders browser mockup preview', () => {
    render(<Hero />)
    
    // Check for browser mockup elements
    expect(screen.getByText('yourapp.com')).toBeInTheDocument()
    expect(screen.getByText('Your App Preview')).toBeInTheDocument()
    expect(screen.getByText('Amazing things await')).toBeInTheDocument()
  })

  it('has correct button variants and sizes', () => {
    render(<Hero />)
    
    const getStartedButton = screen.getByRole('button', { name: /get started/i })
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i })
    
    // Check for gradient classes on Get Started button
    expect(getStartedButton.className).toContain('bg-gradient-to-r')
    
    // Check for outline variant on Learn More button
    expect(learnMoreButton.className).toContain('border-2')
  })

  it('renders gradient background elements', () => {
    const { container } = render(<Hero />)
    
    // Check for gradient background divs
    const gradientElements = container.querySelectorAll('.bg-gradient-to-br')
    expect(gradientElements.length).toBeGreaterThan(0)
    
    // Check for animated orbs
    const blurElements = container.querySelectorAll('.blur-3xl')
    expect(blurElements.length).toBeGreaterThan(0)
  })

  it('renders with proper semantic structure', () => {
    const { container } = render(<Hero />)
    
    // Check for section element
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
    
    // Check for h1 heading
    const heading = container.querySelector('h1')
    expect(heading).toBeInTheDocument()
  })
})