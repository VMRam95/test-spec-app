'use client'

import { Hero } from '@/components/Hero'
import { Card } from '@/components/Card'
import { ContactForm } from '@/components/ContactForm'
import { Button } from '@/components/Button'
import { useState, useEffect } from 'react'

const features = [
  {
    title: 'Fast Performance',
    description: 'Built with Next.js for optimal loading speeds and SEO.',
    icon: '⚡',
  },
  {
    title: 'Responsive Design',
    description: 'Looks great on all devices, from mobile to desktop.',
    icon: '📱',
  },
  {
    title: 'Modern Stack',
    description: 'TypeScript and Tailwind CSS for maintainable code.',
    icon: '🚀',
  },
  {
    title: 'Dark Mode',
    description: 'Automatic dark mode support for better user experience.',
    icon: '🌙',
  },
  {
    title: 'SEO Optimized',
    description: 'Built-in SEO best practices for better visibility.',
    icon: '🔍',
  },
  {
    title: 'Easy to Customize',
    description: 'Clean code structure makes customization simple.',
    icon: '🎨',
  },
]

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Simple Landing</h1>
          <Button 
            onClick={toggleDarkMode}
            variant="secondary"
            className="p-2"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </Button>
        </div>
      </nav>

      <Hero />

      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Features
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Everything you need to build a modern web application
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Have questions? We'd love to hear from you.
          </p>
          <ContactForm />
        </div>
      </section>

      <footer className="bg-gray-100 dark:bg-gray-950 py-8 px-4">
        <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 Simple Landing Page. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}