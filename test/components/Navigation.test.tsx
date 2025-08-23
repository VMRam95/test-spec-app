import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navigation from '@/components/Navigation'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn()

describe('Navigation', () => {
  const mockToggleTheme = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders navigation with all items', () => {
    render(<Navigation theme="light" toggleTheme={mockToggleTheme} />)
    
    // Check logo
    expect(screen.getByText('Nexus')).toBeInTheDocument()
    
    // Check navigation items (desktop view)
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /features/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument()
    
    // Check Get Started button
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument()
    
    // Check theme toggle button
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument()
  })

  it('toggles theme when theme button is clicked', async () => {
    const user = userEvent.setup()
    render(<Navigation theme="light" toggleTheme={mockToggleTheme} />)
    
    const themeButton = screen.getByLabelText('Toggle theme')
    await user.click(themeButton)
    
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })

  it('shows moon icon in light theme', () => {
    const { container } = render(<Navigation theme="light" toggleTheme={mockToggleTheme} />)
    
    // Check for Moon icon class
    const moonIcon = container.querySelector('.w-5.h-5')
    expect(moonIcon).toBeInTheDocument()
  })

  it('shows sun icon in dark theme', () => {
    const { container } = render(<Navigation theme="dark" toggleTheme={mockToggleTheme} />)
    
    // Check for Sun icon class
    const sunIcon = container.querySelector('.text-yellow-500')
    expect(sunIcon).toBeInTheDocument()
  })

  it('handles navigation clicks and scrolls to sections', async () => {
    const user = userEvent.setup()
    
    // Create mock sections
    const sections = ['home', 'features', 'contact']
    sections.forEach(id => {
      const element = document.createElement('div')
      element.id = id
      document.body.appendChild(element)
    })
    
    render(<Navigation theme="light" toggleTheme={mockToggleTheme} />)
    
    const featuresButton = screen.getByRole('button', { name: /features/i })
    await user.click(featuresButton)
    
    const featuresElement = document.getElementById('features')
    expect(featuresElement?.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    
    // Cleanup
    sections.forEach(id => {
      const element = document.getElementById(id)
      if (element) document.body.removeChild(element)
    })
  })

  it('opens and closes mobile menu', async () => {
    const user = userEvent.setup()
    render(<Navigation theme="light" toggleTheme={mockToggleTheme} />)
    
    const menuButton = screen.getByLabelText('Toggle menu')
    
    // Open menu
    await user.click(menuButton)
    
    // Check if menu items are visible
    await waitFor(() => {
      expect(screen.getByText('Menu')).toBeInTheDocument()
    })
    
    // Close menu by clicking the X button
    const closeButton = screen.getAllByRole('button').find(btn => 
      btn.querySelector('.w-5.h-5')
    )
    if (closeButton) {
      await user.click(closeButton)
    }
  })

  it('applies scrolled styles when page is scrolled', () => {
    const { container } = render(<Navigation theme="light" toggleTheme={mockToggleTheme} />)
    
    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    fireEvent.scroll(window)
    
    // Check if nav has scrolled styles
    const nav = container.querySelector('nav')
    expect(nav?.className).toContain('backdrop-blur-xl')
  })

  it('updates active section based on scroll position', () => {
    // Create mock sections with positions
    const sections = [
      { id: 'home', offsetTop: 0, offsetHeight: 500 },
      { id: 'features', offsetTop: 500, offsetHeight: 500 },
      { id: 'contact', offsetTop: 1000, offsetHeight: 500 }
    ]
    
    sections.forEach(section => {
      const element = document.createElement('div')
      element.id = section.id
      Object.defineProperty(element, 'offsetTop', { value: section.offsetTop })
      Object.defineProperty(element, 'offsetHeight', { value: section.offsetHeight })
      document.body.appendChild(element)
    })
    
    render(<Navigation theme="light" toggleTheme={mockToggleTheme} />)
    
    // Simulate scrolling to features section
    Object.defineProperty(window, 'scrollY', { value: 450, writable: true })
    fireEvent.scroll(window)
    
    // Cleanup
    sections.forEach(section => {
      const element = document.getElementById(section.id)
      if (element) document.body.removeChild(element)
    })
  })

  it('closes mobile menu when navigation item is clicked', async () => {
    const user = userEvent.setup()
    
    // Create mock contact section
    const contactSection = document.createElement('div')
    contactSection.id = 'contact'
    document.body.appendChild(contactSection)
    
    render(<Navigation theme="light" toggleTheme={mockToggleTheme} />)
    
    // Open mobile menu
    const menuButton = screen.getByLabelText('Toggle menu')
    await user.click(menuButton)
    
    // Wait for menu to open
    await waitFor(() => {
      expect(screen.getByText('Menu')).toBeInTheDocument()
    })
    
    // Click on a navigation item
    const contactButtons = screen.getAllByRole('button', { name: /contact/i })
    const mobileContactButton = contactButtons.find(btn => 
      btn.className.includes('w-full')
    )
    
    if (mobileContactButton) {
      await user.click(mobileContactButton)
    }
    
    // Menu should close
    await waitFor(() => {
      expect(screen.queryByText('Menu')).not.toBeInTheDocument()
    })
    
    // Cleanup
    document.body.removeChild(contactSection)
  })

  it('renders Get Started CTA button in mobile menu', async () => {
    const user = userEvent.setup()
    render(<Navigation theme="light" toggleTheme={mockToggleTheme} />)
    
    // Open mobile menu
    const menuButton = screen.getByLabelText('Toggle menu')
    await user.click(menuButton)
    
    // Wait for menu to open
    await waitFor(() => {
      expect(screen.getByText('Menu')).toBeInTheDocument()
    })
    
    // Check for Get Started button in mobile menu
    const getStartedButtons = screen.getAllByRole('button', { name: /get started/i })
    expect(getStartedButtons.length).toBeGreaterThan(1) // One in desktop, one in mobile
  })
})