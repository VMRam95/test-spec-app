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
  // Dark mode setup
  const { theme, setTheme } = useTheme();
  
  // Form state management
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [formSuccess, setFormSuccess] = useState(false);

  // Email validation
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<FormData> = {};
    
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.message) errors.message = 'Message is required';

    if (Object.keys(errors).length === 0) {
      setFormSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* SEO Meta Tags handled in layout.tsx */}
      
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-24 lg:py-32" aria-labelledby="hero-heading">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 
              id="hero-heading"
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
            >
              Welcome to Our Landing Page
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Transform your ideas into reality with our innovative solutions
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#contact"
                className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                aria-label="Get Started"
              >
                Get Started
              </a>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-md px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? '🌞 Light' : '🌙 Dark'} Mode
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section 
        className="py-24 bg-gray-50 dark:bg-gray-800"
        aria-labelledby="features-heading"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 
            id="features-heading"
            className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🚀', title: 'Fast Performance', description: 'Lightning-quick load times and smooth interactions' },
              { icon: '🎨', title: 'Modern Design', description: 'Clean and intuitive user interface' },
              { icon: '📱', title: 'Responsive', description: 'Perfect display on all devices' },
              { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security built-in' },
              { icon: '🌙', title: 'Dark Mode', description: 'Easy on the eyes, day or night' },
              { icon: '♿', title: 'Accessible', description: 'WCAG 2.1 AA compliant' }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                role="article"
              >
                <div className="text-4xl mb-4" aria-hidden="true">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section 
        id="contact" 
        className="py-24 px-6 lg:px-8"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-2xl mx-auto">
          <h2 
            id="contact-heading"
            className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            Contact Us
          </h2>
          {formSuccess ? (
            <div 
              className="bg-green-100 dark:bg-green-900 p-4 rounded-md text-green-700 dark:text-green-100 text-center"
              role="alert"
            >
              Thank you for your message! We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label 
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                />
                {formErrors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                />
                {formErrors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? "message-error" : undefined}
                />
                {formErrors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}