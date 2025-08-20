'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

// Types for form data
interface ContactFormData {
  email: string;
  message: string;
  name: string;
}

export default function Home() {
  // Dark mode state management
  const { theme, setTheme } = useTheme();
  
  // Form state management
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    message: '',
    name: '',
  });
  const [emailError, setEmailError] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  // Email validation
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    setSubmitStatus('sending');
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ email: '', message: '', name: '' });
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8" role="heading">
            Welcome to Our Landing Page
          </h1>
          <p className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto">
            Transform your digital presence with our innovative solutions
          </p>
          <button
            className="bg-white text-blue-600 dark:bg-gray-800 dark:text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all duration-200 focus:ring-4 focus:ring-white focus:ring-opacity-50"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Learn more about our features"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">Experience blazing fast performance with our optimized platform.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Secure</h3>
              <p className="text-gray-600 dark:text-gray-300">Your data is protected with enterprise-grade security.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Customizable</h3>
              <p className="text-gray-600 dark:text-gray-300">Tailor the platform to match your specific needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                aria-label="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                  emailError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setEmailError('');
                }}
                aria-label="Your email"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? 'email-error' : undefined}
              />
              {emailError && (
                <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
                  {emailError}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                aria-label="Your message"
              />
            </div>
            <button
              type="submit"
              disabled={submitStatus === 'sending'}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
              aria-label="Submit contact form"
            >
              {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'success' && (
              <p className="text-green-600 dark:text-green-400 text-center" role="alert">
                Thank you! We'll get back to you soon.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed bottom-6 right-6 p-3 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
        aria-label="Toggle dark mode"
      >
        {theme === 'dark' ? (
          <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </main>
  );
}