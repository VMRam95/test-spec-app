'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import Card from '@/components/Card'
import ContactForm from '@/components/ContactForm'
import Navigation from '@/components/Navigation'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Shield, Rocket, Users, Award, Star, ArrowUp, Sparkles, Code, Palette, Globe, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Built with Next.js for optimal performance and speed. Experience blazing-fast load times and smooth interactions.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure by Default',
      description: 'Enterprise-grade security with built-in protection. Your data is safe with industry-standard encryption.'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Easy to Deploy',
      description: 'Deploy to production in minutes with Vercel. One-click deployment with automatic scaling.'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Clean Code',
      description: 'Well-structured, maintainable code following best practices. Built with TypeScript for type safety.'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Beautiful Design',
      description: 'Modern, responsive design with attention to detail. Dark mode support and smooth animations.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Ready',
      description: 'Built for scale with internationalization support. Reach users worldwide with optimized delivery.'
    }
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
        {/* Navigation */}
        <Navigation theme={theme} toggleTheme={toggleTheme} />

        {/* Hero Section */}
        <main>
          <section id="home">
            <Hero />
          </section>
          
          {/* Features Section */}
          <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-50 to-transparent dark:from-blue-950/20" />
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950/20" />
            </div>

            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50 animate-pulse" />
                    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full">
                      <Sparkles className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Powerful Features
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Everything you need to build modern web applications with confidence. 
                  Our comprehensive toolkit empowers developers to create exceptional experiences.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} {...feature} index={index} />
                ))}
              </div>

              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {[
                  { label: 'Active Users', value: '10K+' },
                  { label: 'Projects Built', value: '500+' },
                  { label: 'GitHub Stars', value: '2.5K' },
                  { label: 'Contributors', value: '50+' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8">
            {/* Premium gradient background */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,transparent,white,transparent)]" />
            </div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-full blur-lg opacity-50 animate-pulse" />
                    <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white p-3 rounded-full">
                      <Mail className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Let's Connect
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700"
              >
                <ContactForm />
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-2">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Nexus</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Building the future of web applications with modern technologies and beautiful design.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 Nexus. All rights reserved.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social}
                  >
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                      <span className="text-xs">{social[0]}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={scrollToTop}
              className={cn(
                "fixed bottom-8 right-8 z-40",
                "p-3 rounded-full",
                "bg-gradient-to-r from-blue-600 to-purple-600",
                "text-white shadow-2xl",
                "hover:shadow-3xl hover:scale-110",
                "transition-all duration-300"
              )}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}