import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/ContactForm'

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render all form fields', () => {
      render(<ContactForm />)
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })

    it('should have correct input types', () => {
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      
      expect(nameInput).toHaveAttribute('type', 'text')
      expect(emailInput).toHaveAttribute('type', 'email')
    })

    it('should have correct initial values', () => {
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement
      
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(messageInput.value).toBe('')
    })
  })

  describe('Form Validation', () => {
    it('should show error when name is empty', async () => {
      render(<ContactForm />)
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument()
      })
    })

    it('should show error when email is empty', async () => {
      render(<ContactForm />)
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument()
      })
    })

    it('should show error when email is invalid', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      await user.type(emailInput, 'invalid-email')
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
      })
    })

    it('should show error when message is empty', async () => {
      render(<ContactForm />)
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Message is required')).toBeInTheDocument()
      })
    })

    it('should validate multiple email formats correctly', async () => {
      const user = userEvent.setup()
      
      // Valid email tests
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        '123@test.com'
      ]
      
      for (const email of validEmails) {
        const { unmount } = render(<ContactForm />)
        
        const emailInput = screen.getByLabelText(/email/i)
        const nameInput = screen.getByLabelText(/name/i)
        const messageInput = screen.getByLabelText(/message/i)
        const submitButton = screen.getByRole('button', { name: /send message/i })
        
        await user.type(emailInput, email)
        await user.type(nameInput, 'Test User')
        await user.type(messageInput, 'Test message')
        await user.click(submitButton)
        
        await waitFor(() => {
          expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
        })
        
        unmount()
      }
    })

    it('should clear error when user starts typing', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument()
      })
      
      const nameInput = screen.getByLabelText(/name/i)
      await user.type(nameInput, 'J')
      
      await waitFor(() => {
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
      })
    })
  })

  describe('Form Submission', () => {
    it('should handle successful form submission', async () => {
      const user = userEvent.setup()
      const consoleSpy = vi.spyOn(console, 'log')
      
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/message/i)
      
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'This is a test message')
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/sending/i)).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument()
      }, { timeout: 2000 })
      
      expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message'
      })
    })

    it('should disable form fields during submission', async () => {
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
      
      await waitFor(() => {
        expect(nameInput).toBeDisabled()
        expect(emailInput).toBeDisabled()
        expect(messageInput).toBeDisabled()
        expect(submitButton).toBeDisabled()
      })
    })

    it('should reset form after successful submission', async () => {
      vi.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement
      
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'Test message')
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      // Wait for submission to complete
      await vi.advanceTimersByTimeAsync(1500)
      
      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument()
      })
      
      // Advance time to trigger form reset
      await vi.advanceTimersByTimeAsync(3000)
      
      await waitFor(() => {
        expect(nameInput.value).toBe('')
        expect(emailInput.value).toBe('')
        expect(messageInput.value).toBe('')
        expect(screen.queryByText(/thank you for your message/i)).not.toBeInTheDocument()
      })
      
      vi.useRealTimers()
    })

    it('should not submit form with validation errors', async () => {
      const user = userEvent.setup({ delay: null })
      const consoleSpy = vi.spyOn(console, 'log')
      
      render(<ContactForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      await user.type(emailInput, 'invalid-email')
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument()
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
        expect(screen.getByText('Message is required')).toBeInTheDocument()
      })
      
      expect(consoleSpy).not.toHaveBeenCalled()
    })
  })

  describe('User Interactions', () => {
    it('should update input values on change', async () => {
      const user = userEvent.setup({ delay: null })
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement
      
      await user.type(nameInput, 'Test Name')
      await user.type(emailInput, 'test@email.com')
      await user.type(messageInput, 'Test message content')
      
      expect(nameInput.value).toBe('Test Name')
      expect(emailInput.value).toBe('test@email.com')
      expect(messageInput.value).toBe('Test message content')
    })

    it('should handle form submission with trimmed values', async () => {
      const user = userEvent.setup({ delay: null })
      const consoleSpy = vi.spyOn(console, 'log')
      vi.useFakeTimers()
      
      render(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/message/i)
      
      await user.type(nameInput, '  John Doe  ')
      await user.type(emailInput, '  john@example.com  ')
      await user.type(messageInput, '  Test message  ')
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      await vi.advanceTimersByTimeAsync(1500)
      
      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument()
      })
      
      expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
        name: '  John Doe  ',
        email: '  john@example.com  ',
        message: '  Test message  '
      })
      
      vi.useRealTimers()
    })
  })
})