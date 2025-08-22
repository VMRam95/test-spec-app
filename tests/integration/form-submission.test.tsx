import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/ContactForm'

describe('Contact Form Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  describe('Complete User Flow', () => {
    it('should handle complete form submission flow', async () => {
      vi.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      render(<ContactForm />)

      // User fills out the form
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/message/i)

      await user.type(nameInput, 'Jane Smith')
      await user.type(emailInput, 'jane.smith@example.com')
      await user.type(messageInput, 'I would like to learn more about your services.')

      // User submits the form
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      // Form shows loading state
      expect(screen.getByText(/sending/i)).toBeInTheDocument()
      expect(submitButton).toBeDisabled()

      // Advance time for submission
      await vi.advanceTimersByTimeAsync(1500)

      // Success message appears
      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument()
      })

      // Form resets after delay
      await vi.advanceTimersByTimeAsync(3000)
      
      await waitFor(() => {
        expect(nameInput).toHaveValue('')
        expect(emailInput).toHaveValue('')
        expect(messageInput).toHaveValue('')
      })

      vi.useRealTimers()
    }, 15000)

    it('should handle validation errors and recovery', async () => {
      const user = userEvent.setup({ delay: null })
      render(<ContactForm />)

      // User submits empty form
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      // All validation errors appear
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument()
        expect(screen.getByText('Email is required')).toBeInTheDocument()
        expect(screen.getByText('Message is required')).toBeInTheDocument()
      })

      // User corrects one field at a time
      const nameInput = screen.getByLabelText(/name/i)
      await user.type(nameInput, 'John')
      
      // Name error disappears
      await waitFor(() => {
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
      })

      // User enters invalid email
      const emailInput = screen.getByLabelText(/email/i)
      await user.type(emailInput, 'invalid-email')
      await user.click(submitButton)

      // Email validation error appears
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
      })

      // User corrects email
      await user.clear(emailInput)
      await user.type(emailInput, 'john@example.com')

      // User fills message
      const messageInput = screen.getByLabelText(/message/i)
      await user.type(messageInput, 'Test message')

      // Form submits successfully
      vi.useFakeTimers()
      await user.click(submitButton)
      await vi.advanceTimersByTimeAsync(1500)
      
      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument()
      })
      
      vi.useRealTimers()
    }, 15000)

    it('should handle rapid submissions correctly', async () => {
      vi.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      render(<ContactForm />)

      // Fill form with valid data
      await user.type(screen.getByLabelText(/name/i), 'Test User')
      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.type(screen.getByLabelText(/message/i), 'Test message')

      const submitButton = screen.getByRole('button', { name: /send message/i })
      
      // Try to submit multiple times rapidly
      await user.click(submitButton)
      await user.click(submitButton)
      await user.click(submitButton)

      // Should only process one submission
      expect(submitButton).toBeDisabled()

      // Wait for success
      await vi.advanceTimersByTimeAsync(1500)
      
      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument()
      })
      
      vi.useRealTimers()
    }, 15000)

    it('should preserve form data on validation error', async () => {
      const user = userEvent.setup({ delay: null })
      render(<ContactForm />)

      // Fill form with some valid and some invalid data
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'invalid-email')

      // Submit form
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      // Check validation errors appear
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
        expect(screen.getByText('Message is required')).toBeInTheDocument()
      })

      // Check that valid data is preserved
      expect(nameInput).toHaveValue('John Doe')
      expect(emailInput).toHaveValue('invalid-email')
    })
  })

  describe('Edge Cases', () => {
    it('should handle very long input values', async () => {
      vi.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      render(<ContactForm />)

      const longName = 'A'.repeat(100)
      const longEmail = 'a'.repeat(50) + '@example.com'
      const longMessage = 'B'.repeat(500)

      await user.type(screen.getByLabelText(/name/i), longName)
      await user.type(screen.getByLabelText(/email/i), longEmail)
      await user.type(screen.getByLabelText(/message/i), longMessage)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      await vi.advanceTimersByTimeAsync(1500)

      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument()
      })
      
      vi.useRealTimers()
    }, 15000)

    it('should handle special characters in input', async () => {
      vi.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      render(<ContactForm />)

      const specialCharsName = "O'Brien-Smith & Co."
      const specialCharsMessage = 'Hello! How are you? I have some questions.'

      await user.type(screen.getByLabelText(/name/i), specialCharsName)
      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.type(screen.getByLabelText(/message/i), specialCharsMessage)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      await vi.advanceTimersByTimeAsync(1500)

      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument()
      })
      
      vi.useRealTimers()
    }, 15000)

    it('should handle paste events', async () => {
      const user = userEvent.setup({ delay: null })
      render(<ContactForm />)

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement

      // Simulate paste
      await user.click(emailInput)
      await user.paste('pasted.email@example.com')

      expect(emailInput.value).toBe('pasted.email@example.com')
    })

    it('should handle browser autofill', async () => {
      vi.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      render(<ContactForm />)

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement

      // Simulate browser autofill
      fireEvent.change(nameInput, { target: { value: 'Autofilled Name' } })
      fireEvent.change(emailInput, { target: { value: 'autofill@example.com' } })

      // Fill remaining field manually
      await user.type(screen.getByLabelText(/message/i), 'Test message')

      // Submit form
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      await vi.advanceTimersByTimeAsync(1500)

      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument()
      })
      
      vi.useRealTimers()
    }, 15000)
  })

  describe('Performance', () => {
    it('should clear errors immediately on typing', async () => {
      const user = userEvent.setup({ delay: null })
      render(<ContactForm />)

      const emailInput = screen.getByLabelText(/email/i)
      
      // Submit to trigger validation
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument()
      })

      // Start typing to clear error
      await user.type(emailInput, 't')

      // Error should clear immediately when user starts typing
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
    })

    it('should handle multiple form instances', () => {
      render(
        <div>
          <ContactForm />
          <ContactForm />
        </div>
      )

      // Should render two independent forms
      const forms = screen.getAllByRole('button', { name: /send message/i })
      expect(forms).toHaveLength(2)

      // Each form should have its own state
      const nameInputs = screen.getAllByLabelText(/name/i)
      expect(nameInputs).toHaveLength(2)
      
      // Forms should be independent
      expect(nameInputs[0]).not.toBe(nameInputs[1])
    })
  })
})

// Add missing import
import { fireEvent } from '@testing-library/react'