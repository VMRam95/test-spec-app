'use client'

import { Button } from './Button'

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-900 opacity-50"></div>
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          <span className="gradient-text">Welcome to</span>
          <br />
          <span className="text-gray-900 dark:text-white">Simple Landing</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up">
          Build beautiful, responsive websites with Next.js and Tailwind CSS. 
          Fast, modern, and ready for production.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <Button 
            size="lg"
            onClick={() => scrollToSection('features')}
          >
            Explore Features
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => scrollToSection('contact')}
          >
            Get Started
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 text-gray-50 dark:text-gray-900" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="currentColor">
          <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"></path>
        </svg>
      </div>
    </section>
  )
}