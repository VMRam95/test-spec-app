import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '@/components/ContactForm';
import '@testing-library/jest-dom';

describe('ContactForm', () => {
  it('renders contact form elements', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit|send/i })).toBeInTheDocument();
  });

  it('validates email correctly', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit|send/i });

    // Test invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });

    // Test valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.queryByText(/please enter a valid email/i)).not.toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<ContactForm onSubmit={mockSubmit} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit|send/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
        email: 'test@example.com'
      }));
    });
  });
});