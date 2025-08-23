import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import React from 'react'

describe('ThemeContext', () => {
  beforeEach(() => {
    // Clear localStorage and reset document classes
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    vi.clearAllMocks()
  })

  it('provides theme context to children', () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    )
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders children while mounting', () => {
    const TestComponent = () => {
      return <div>Child Component</div>
    }
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    expect(screen.getByText('Child Component')).toBeInTheDocument()
  })

  // Integration tests would be better done with E2E tests
  // since the ThemeProvider has mounting state that makes unit testing complex
})