import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Card from '@/components/Card'
import { Zap } from 'lucide-react'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

describe('Card', () => {
  const defaultProps = {
    title: 'Test Card',
    description: 'This is a test card description',
  }

  it('renders card with title and description', () => {
    render(<Card {...defaultProps} />)
    
    expect(screen.getByText('Test Card')).toBeInTheDocument()
    expect(screen.getByText('This is a test card description')).toBeInTheDocument()
  })

  it('renders card with icon when provided', () => {
    const { container } = render(
      <Card {...defaultProps} icon={<Zap data-testid="test-icon" />} />
    )
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    
    // Check for icon container elements
    const iconContainer = container.querySelector('.rounded-xl.bg-gradient-to-br')
    expect(iconContainer).toBeInTheDocument()
  })

  it('renders without icon when not provided', () => {
    const { container } = render(<Card {...defaultProps} />)
    
    // Should not have icon container
    const iconContainer = container.querySelector('.mb-6.inline-block')
    expect(iconContainer).not.toBeInTheDocument()
  })

  it('renders Learn more link', () => {
    render(<Card {...defaultProps} />)
    
    expect(screen.getByText('Learn more')).toBeInTheDocument()
  })

  it('applies custom className when provided', () => {
    const { container } = render(
      <Card {...defaultProps} className="custom-class" />
    )
    
    const card = container.querySelector('.custom-class')
    expect(card).toBeInTheDocument()
  })

  it('applies hover effects classes', () => {
    const { container } = render(<Card {...defaultProps} />)
    
    // Check for hover-related classes
    const card = container.querySelector('.group')
    expect(card).toBeInTheDocument()
    
    const hoverShadow = container.querySelector('.hover\\:shadow-2xl')
    expect(hoverShadow).toBeInTheDocument()
  })

  it('has gradient background elements', () => {
    const { container } = render(<Card {...defaultProps} />)
    
    // Check for gradient background div
    const gradientBg = container.querySelector('.bg-gradient-to-r.from-blue-600\\/20')
    expect(gradientBg).toBeInTheDocument()
  })

  it('renders with dark mode classes', () => {
    const { container } = render(<Card {...defaultProps} />)
    
    // Check for dark mode classes
    const darkBg = container.querySelector('.dark\\:bg-gray-800')
    expect(darkBg).toBeInTheDocument()
    
    const darkBorder = container.querySelector('.dark\\:border-gray-700')
    expect(darkBorder).toBeInTheDocument()
  })

  it('renders corner accent element', () => {
    const { container } = render(<Card {...defaultProps} />)
    
    // Check for corner accent div
    const cornerAccent = container.querySelector('.rounded-bl-full')
    expect(cornerAccent).toBeInTheDocument()
  })

  it('uses index prop for animation delay', () => {
    const { container } = render(<Card {...defaultProps} index={3} />)
    
    // The component should still render properly with index
    expect(screen.getByText('Test Card')).toBeInTheDocument()
  })

  it('renders title with hover gradient classes', () => {
    render(<Card {...defaultProps} />)
    
    const title = screen.getByText('Test Card')
    expect(title.className).toContain('group-hover:bg-gradient-to-r')
    expect(title.className).toContain('group-hover:from-blue-600')
    expect(title.className).toContain('group-hover:to-purple-600')
  })

  it('renders description with correct text color classes', () => {
    render(<Card {...defaultProps} />)
    
    const description = screen.getByText('This is a test card description')
    expect(description.className).toContain('text-gray-600')
    expect(description.className).toContain('dark:text-gray-400')
  })

  it('has proper semantic structure', () => {
    const { container } = render(<Card {...defaultProps} />)
    
    // Check for h3 heading
    const heading = container.querySelector('h3')
    expect(heading).toBeInTheDocument()
    expect(heading?.textContent).toBe('Test Card')
    
    // Check for paragraph
    const paragraph = container.querySelector('p')
    expect(paragraph).toBeInTheDocument()
    expect(paragraph?.textContent).toBe('This is a test card description')
  })

  it('renders animated border gradient', () => {
    const { container } = render(<Card {...defaultProps} />)
    
    // Check for animated border gradient element
    const borderGradient = container.querySelector('.via-blue-600\\/50')
    expect(borderGradient).toBeInTheDocument()
  })
})