'use client'

import React from 'react'
import { Button } from './Button'

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaSecondaryText?: string
  onCtaClick?: () => void
  onCtaSecondaryClick?: () => void
}

const Hero: React.FC<HeroProps> = ({
  title = 'Build Something Amazing',
  subtitle = 'Create beautiful, responsive web applications with modern tools and best practices',
  ctaText = 'Get Started',
  ctaSecondaryText = 'Learn More',
  onCtaClick,
  onCtaSecondaryClick
}) => {
  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-700/25 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <h1 
              id="hero-title"
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl"
            >
              <span className="block">{title.split(' ')[0]}</span>
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl">
              {subtitle}
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={onCtaClick}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto min-w-[200px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                aria-label={`${ctaText} - Primary action`}
              >
                {ctaText}
              </Button>
              
              <Button
                onClick={onCtaSecondaryClick}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto min-w-[200px] border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                aria-label={`${ctaSecondaryText} - Secondary action`}
              >
                {ctaSecondaryText}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
    </section>
  )
}

export default Hero