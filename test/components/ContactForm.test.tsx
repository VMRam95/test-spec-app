import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '@/components/ContactForm'

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Form Rendering', () => {
    it('renders all form fields correctly', () => {
      render(<ContactForm />)
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })

    it('renders with correct placeholder text', () => {
      render(<ContactForm />)
      
      expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Your message...')).toBeInTheDocument()
    })

    it('has proper ARIA attributes for accessibility', () => {
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/message/i)
      
      expect(nameInput).toHaveAttribute('aria-invalid', 'false')
      expect(emailInput).toHaveAttribute('aria-invalid', 'false')
      expect(messageInput).toHaveAttribute('aria-invalid', 'false')
    })
  })

  describe('Form Validation', () => {
    it('shows error when submitting empty form', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      expect(await screen.findByText('Name is required')).toBeInTheDocument()
      expect(await screen.findByText('Email is required')).toBeInTheDocument()
      expect(await screen.findByText('Message is required')).toBeInTheDocument()
    })

    it('validates email format correctly', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      
      // Test invalid email formats
      const invalidEmails = [
        'invalid',
        'invalid@',
        '@invalid.com',
        'invalid@.com',
        'invalid.com'
      ]
      
      for (const invalidEmail of invalidEmails) {
        await user.clear(emailInput)
        await user.type(emailInput, invalidEmail)
        await user.click(screen.getByRole('button', { name: /send message/i }))
        
        expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument()
      }
    })

    it('accepts valid email formats', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const nameInput = screen.getByLabelText(/name/i)
      const messageInput = screen.getByLabelText(/message/i)
      
      // Fill form with valid data
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'valid@email.com')
      await user.type(messageInput, 'Test message')
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      // Should not show email error
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
    })

    it('clears error messages when user starts typing', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      // Submit empty form to trigger errors
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      expect(await screen.findByText('Name is required')).toBeInTheDocument()
      
      // Start typing in name field
      const nameInput = screen.getByLabelText(/name/i)
      await user.type(nameInput, 'J')
      
      // Error should be cleared
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
    })

    it('validates all fields are trimmed', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/message/i)
      
      // Enter only spaces
      await user.type(nameInput, '   ')
      await user.type(emailInput, '   ')
      await user.type(messageInput, '   ')
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      expect(await screen.findByText('Name is required')).toBeInTheDocument()
      expect(await screen.findByText('Email is required')).toBeInTheDocument()
      expect(await screen.findByText('Message is required')).toBeInTheDocument()
    })
  })

  describe('Form Submission', () => {
    it('submits form with valid data', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/message/i)
      
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'This is a test message')
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      // Check for loading state
      expect(await screen.findByText(/sending/i)).toBeInTheDocument()
      
      // Check for success message
      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('resets form after successful submission', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement
      
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'Test message')
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument()
      }, { timeout: 3000 })
      
      // Check fields are reset
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(messageInput.value).toBe('')
    })

    it('disables submit button while submitting', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/message/i)
      
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'Test message')
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      // Button should be disabled during submission
      expect(submitButton).toBeDisabled()
      expect(submitButton).toHaveAttribute('aria-busy', 'true')
    })

    it('shows spinner icon while submitting', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/message/i)
      
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'Test message')
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      // Check for spinner animation
      const spinner = document.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Dark Mode Support', () => {
    it('applies dark mode classes correctly', () => {
      render(<ContactForm />)
      
      const container = screen.getByText(/get in touch/i).closest('div')
      expect(container).toHaveClass('dark:bg-gray-800')
      
      const heading = screen.getByText(/get in touch/i)
      expect(heading).toHaveClass('dark:text-white')
      
      const description = screen.getByText(/we'd love to hear from you/i)
      expect(description).toHaveClass('dark:text-gray-400')
    })

    it('applies dark mode classes to form inputs', () => {
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/message/i)
      
      expect(nameInput).toHaveClass('dark:bg-gray-700')
      expect(nameInput).toHaveClass('dark:text-white')
      expect(emailInput).toHaveClass('dark:bg-gray-700')
      expect(emailInput).toHaveClass('dark:text-white')
      expect(messageInput).toHaveClass('dark:bg-gray-700')
      expect(messageInput).toHaveClass('dark:text-white')
    })
  })

  describe('Responsive Design', () => {
    it('has responsive container classes', () => {
      render(<ContactForm />)
      
      const section = screen.getByText(/get in touch/i).closest('section')
      expect(section).toHaveClass('px-4')
      expect(section).toHaveClass('sm:px-6')
      expect(section).toHaveClass('lg:px-8')
    })

    it('has responsive text size classes', () => {
      render(<ContactForm />)
      
      const heading = screen.getByText(/get in touch/i)
      expect(heading).toHaveClass('text-2xl')
      expect(heading).toHaveClass('sm:text-3xl')
    })

    it('has responsive button width', () => {
      render(<ContactForm />)
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      expect(submitButton).toHaveClass('w-full')
      expect(submitButton).toHaveClass('sm:w-auto')
    })
  })

  describe('Accessibility', () => {
    it('has proper form structure with labels', () => {
      render(<ContactForm />)
      
      const form = document.querySelector('form')
      expect(form).toHaveAttribute('noValidate')
      
      // Check all inputs have associated labels
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/message/i)
      
      expect(nameInput).toBeInTheDocument()
      expect(emailInput).toBeInTheDocument()
      expect(messageInput).toBeInTheDocument()
    })

    it('sets aria-invalid when validation fails', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      await waitFor(() => {
        const nameInput = screen.getByLabelText(/name/i)
        const emailInput = screen.getByLabelText(/email/i)
        const messageInput = screen.getByLabelText(/message/i)
        
        expect(nameInput).toHaveAttribute('aria-invalid', 'true')
        expect(emailInput).toHaveAttribute('aria-invalid', 'true')
        expect(messageInput).toHaveAttribute('aria-invalid', 'true')
      })
    })

    it('associates error messages with inputs using aria-describedby', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      await waitFor(() => {
        const nameInput = screen.getByLabelText(/name/i)
        const emailInput = screen.getByLabelText(/email/i)
        const messageInput = screen.getByLabelText(/message/i)
        
        expect(nameInput).toHaveAttribute('aria-describedby', 'name-error')
        expect(emailInput).toHaveAttribute('aria-describedby', 'email-error')
        expect(messageInput).toHaveAttribute('aria-describedby', 'message-error')
      })
    })

    it('error messages have proper role attribute', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      const nameError = await screen.findByText('Name is required')
      const emailError = await screen.findByText('Email is required')
      const messageError = await screen.findByText('Message is required')
      
      expect(nameError).toHaveAttribute('role', 'alert')
      expect(emailError).toHaveAttribute('role', 'alert')
      expect(messageError).toHaveAttribute('role', 'alert')
    })

    it('success and error alerts have proper role', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/message/i), 'Test message')
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      // Wait for success message
      const successAlert = await screen.findByText(/thank you for your message/i, {}, { timeout: 3000 })
      const alertContainer = successAlert.closest('div')
      expect(alertContainer).toHaveAttribute('role', 'alert')
    })
  })
})