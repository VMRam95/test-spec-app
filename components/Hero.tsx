'use client'

import Button from './Button'
import { ArrowRight, CheckCircle, Sparkles, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeIn, slideUp, staggerContainer, staggerItem, float } from '@/lib/animations'

export default function Hero() {
  const benefits = [
    'No credit card required',
    '14-day free trial',
    'Cancel anytime'
  ]

  const handleGetStarted = () => {
    const contactSection = document.querySelector('#contact')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLearnMore = () => {
    const featuresSection = document.querySelector('#features')
    featuresSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-10 dark:opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white dark:from-gray-900 dark:via-transparent dark:to-gray-900" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl opacity-20 dark:opacity-30"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-orange-600 rounded-full blur-3xl opacity-20 dark:opacity-30"
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center"
        >
          {/* Announcement badge */}
          <motion.div variants={slideUp} className="inline-flex items-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50 animate-pulse" />
              <div className="relative inline-flex items-center px-4 py-2 border border-blue-200 dark:border-blue-800 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                <Sparkles className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  New features available now
                </span>
                <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
                  NEW
                </span>
              </div>
            </div>
          </motion.div>
          
          {/* Main heading */}
          <motion.h1 
            variants={fadeIn}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          >
            <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              Build Something
            </span>
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-300%">
              Amazing Today
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            variants={slideUp}
            className="mt-8 max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            Create beautiful, responsive web applications with our modern tech stack. 
            Start building your dream project in minutes, not hours.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            variants={slideUp}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              variant="primary" 
              size="large"
              onClick={handleGetStarted}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </Button>
            
            <Button 
              variant="outline" 
              size="large"
              onClick={handleLearnMore}
              className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 hover:bg-white/80 dark:hover:bg-gray-900/80 transform hover:scale-105 transition-all duration-300"
            >
              Learn More
            </Button>
          </motion.div>
          
          {/* Benefits */}
          <motion.div 
            variants={staggerContainer}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm"
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={slideUp}
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded" />
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">Company {i}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Hero image/preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent to-transparent z-10" />
          
          {/* Floating card preview */}
          <motion.div
            animate={float.animate}
            transition={float.animate.transition}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-3xl opacity-30" />
            <div className="relative bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-900/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
              {/* Browser mockup */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200/20 dark:border-gray-700/20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">
                    yourapp.com
                  </div>
                </div>
              </div>
              
              {/* Content preview */}
              <div className="p-8 h-96 flex flex-col items-center justify-center">
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-30"
                  />
                  <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center">
                    <Star className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-2xl font-bold">Your App Preview</p>
                    <p className="mt-2 text-white/80">Amazing things await</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}