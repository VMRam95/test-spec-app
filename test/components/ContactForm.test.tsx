import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '@/components/ContactForm'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: () => null,
}))

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all form fields', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('validates name field correctly', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/name/i)
    
    // Test empty name
    await user.click(nameInput)
    await user.tab()
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })
    
    // Test short name
    await user.type(nameInput, 'A')
    await user.tab()
    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument()
    })
    
    // Test valid name
    await user.clear(nameInput)
    await user.type(nameInput, 'John Doe')
    await user.tab()
    await waitFor(() => {
      expect(screen.queryByText('Name must be at least 2 characters')).not.toBeInTheDocument()
    })
  })

  it('validates email field correctly', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    
    // Test empty email
    await user.click(emailInput)
    await user.tab()
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
    
    // Test invalid email
    await user.type(emailInput, 'invalid-email')
    await user.tab()
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
    
    // Test valid email
    await user.clear(emailInput)
    await user.type(emailInput, 'test@example.com')
    await user.tab()
    await waitFor(() => {
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
    })
  })

  it('validates message field correctly', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const messageInput = screen.getByLabelText(/message/i)
    
    // Test empty message
    await user.click(messageInput)
    await user.tab()
    await waitFor(() => {
      expect(screen.getByText('Message is required')).toBeInTheDocument()
    })
    
    // Test short message
    await user.type(messageInput, 'Hi')
    await user.tab()
    await waitFor(() => {
      expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument()
    })
    
    // Test valid message
    await user.clear(messageInput)
    await user.type(messageInput, 'This is a valid test message')
    await user.tab()
    await waitFor(() => {
      expect(screen.queryByText('Message must be at least 10 characters')).not.toBeInTheDocument()
    })
  })

  it('shows character count for message field', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const messageInput = screen.getByLabelText(/message/i)
    
    expect(screen.getByText('(0/500)')).toBeInTheDocument()
    
    await user.type(messageInput, 'Test message')
    expect(screen.getByText('(12/500)')).toBeInTheDocument()
  })

  it('prevents form submission with invalid data', async () => {
    const user = userEvent.setup()
    const toast = await import('react-hot-toast')
    
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(toast.default.error).toHaveBeenCalledWith(
        expect.stringContaining('Please fix the errors'),
        expect.any(Object)
      )
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const toast = await import('react-hot-toast')
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message for the contact form')
    
    await user.click(submitButton)
    
    // Check that the button shows loading state
    expect(screen.getByText(/sending/i)).toBeInTheDocument()
    
    // Wait for success message
    await waitFor(() => {
      expect(toast.default.success).toHaveBeenCalled()
    }, { timeout: 3000 })
    
    // Check that form is reset
    await waitFor(() => {
      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
      expect(messageInput).toHaveValue('')
    })
  })

  it('shows validation errors on submit with empty form', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Message is required')).toBeInTheDocument()
    })
  })

  it('performs real-time validation after field is touched', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    
    // Touch the field and leave it empty
    await user.click(emailInput)
    await user.tab()
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
    
    // Type invalid email - should show error immediately
    await user.type(emailInput, 'invalid')
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
    
    // Fix the email - error should disappear
    await user.clear(emailInput)
    await user.type(emailInput, 'valid@email.com')
    await waitFor(() => {
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
    })
  })

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message for the contact form')
    
    await user.click(submitButton)
    
    // Button should be disabled during submission
    expect(submitButton).toBeDisabled()
    
    // Wait for submission to complete
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    }, { timeout: 3000 })
  })
})