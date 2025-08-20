'use client';

import { useState, FormEvent } from 'react';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-lg mx-auto p-6 space-y-6 ${className}`}
      noValidate
    >
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium dark:text-gray-200"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-red-500 text-sm" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium dark:text-gray-200"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-red-500 text-sm" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-sm font-medium dark:text-gray-200"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-red-500 text-sm" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {submitStatus === 'success' && (
          <p className="text-green-600 dark:text-green-400" role="status">
            Message sent successfully!
          </p>
        )}
        
        {submitStatus === 'error' && (
          <p className="text-red-600 dark:text-red-400" role="alert">
            Failed to send message. Please try again.
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;