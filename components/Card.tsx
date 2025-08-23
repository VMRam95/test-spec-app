'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

interface CardProps {
  icon?: ReactNode
  title: string
  description: string
  className?: string
  index?: number
}

export default function Card({ icon, title, description, className = '', index = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 scale-95 group-hover:scale-100" />
      
      <div 
        className={cn(
          "relative h-full p-8 bg-white dark:bg-gray-800 rounded-2xl",
          "border border-gray-200 dark:border-gray-700",
          "shadow-lg hover:shadow-2xl transition-all duration-500",
          "overflow-hidden",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-600/10 before:to-purple-600/10",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
          className
        )}
      >
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-transparent via-blue-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="h-full w-full rounded-2xl bg-white dark:bg-gray-800" />
        </div>
        
        <div className="relative z-10">
          {/* Icon container */}
          {icon && (
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-block"
            >
              <div className="relative">
                {/* Icon glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                  <div className="text-blue-600 dark:text-blue-400">
                    {icon}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Title with hover effect */}
          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {description}
          </p>
          
          {/* Learn more link */}
          <motion.div 
            className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <span>Learn more</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.div>
        </div>
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}