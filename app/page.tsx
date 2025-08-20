'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

// Types for form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Home() {
  // Dark mode state management
  const { theme, setTheme } = useTheme();
  
  // Form state management
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [submitStatus, setSubmitStatus] = useState<string>('');

  // Email validation
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<FormData> = {};
    
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.message) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitStatus('sending');
    // Here you would typically send the form data to your backend
    // Simulating API call
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" aria-label="Welcome to our platform">
            Transform Your Ideas Into Reality
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Create stunning experiences with our innovative solutions
          </p>
          <button
            className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
            aria-label="Get Started Button"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">Experience blazing fast performance with our optimized platform.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Secure</h3>
              <p className="text-gray-600 dark:text-gray-300">Your data is protected with enterprise-grade security.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Customizable</h3>
              <p className="text-gray-600 dark:text-gray-300">Tailor the platform to match your specific needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                aria-describedby="name-error"
              />
              {formErrors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formErrors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                aria-describedby="email-error"
              />
              {formErrors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                aria-describedby="message-error"
              />
              {formErrors.message && (
                <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formErrors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitStatus === 'sending'}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50"
            >
              {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <p className="text-green-600 dark:text-green-400 text-center">
                Thank you! Your message has been sent successfully.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed bottom-4 right-4 p-3 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg"
        aria-label="Toggle dark mode"
      >
        {theme === 'dark' ? (
          <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </main>
  );
}