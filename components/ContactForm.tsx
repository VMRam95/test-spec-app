'use client'

import { useState, FormEvent } from 'react'
import Button from './Button'
import { validateEmail, cn } from '@/lib/utils'
import type { FormData, FormErrors } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Send, User, Mail, MessageSquare, Loader2 } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    message: false
  })

  const validateField = (field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.length < 2) return 'Name must be at least 2 characters'
        return undefined
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!validateEmail(value)) return 'Please enter a valid email address'
        return undefined
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.length < 10) return 'Message must be at least 10 characters'
        if (value.length > 500) return 'Message must be less than 500 characters'
        return undefined
      default:
        return undefined
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    Object.keys(formData).forEach((field) => {
      const error = validateField(field as keyof FormData, formData[field as keyof FormData])
      if (error) {
        newErrors[field as keyof FormErrors] = error
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true })
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form', {
        icon: <XCircle className="w-5 h-5" />,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success(
        <div>
          <p className="font-semibold">Message sent successfully!</p>
          <p className="text-sm opacity-90">We'll get back to you within 24 hours.</p>
        </div>,
        {
          icon: <CheckCircle className="w-5 h-5" />,
          duration: 5000,
          style: {
            borderRadius: '10px',
            background: '#10b981',
            color: '#fff',
          },
        }
      )
      
      // Reset form
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
      setTouched({ name: false, email: false, message: false })
      
    } catch (error) {
      toast.error('Something went wrong. Please try again later.', {
        icon: <XCircle className="w-5 h-5" />,
        style: {
          borderRadius: '10px',
          background: '#ef4444',
          color: '#fff',
        },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Real-time validation if field has been touched
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors(prev => ({
        ...prev,
        [field]: error
      }))
    }
  }

  const handleBlur = (field: keyof FormData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field])
    setErrors(prev => ({
      ...prev,
      [field]: error
    }))
  }

  const getFieldState = (field: keyof FormData) => {
    if (!touched[field]) return 'default'
    return errors[field] ? 'error' : 'success'
  }

  return (
    <>
      <Toaster position="top-right" />
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Name Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <User className="inline w-4 h-4 mr-1" />
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              className={cn(
                "w-full px-4 py-3 rounded-xl border-2 transition-all duration-300",
                "focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500",
                "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
                "placeholder-gray-400 dark:placeholder-gray-500",
                getFieldState('name') === 'error' && "border-red-500 dark:border-red-400",
                getFieldState('name') === 'success' && "border-green-500 dark:border-green-400",
                getFieldState('name') === 'default' && "border-gray-300 dark:border-gray-600"
              )}
              placeholder="John Doe"
            />
            <AnimatePresence>
              {getFieldState('name') === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {errors.name && touched.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Mail className="inline w-4 h-4 mr-1" />
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              className={cn(
                "w-full px-4 py-3 rounded-xl border-2 transition-all duration-300",
                "focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500",
                "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
                "placeholder-gray-400 dark:placeholder-gray-500",
                getFieldState('email') === 'error' && "border-red-500 dark:border-red-400",
                getFieldState('email') === 'success' && "border-green-500 dark:border-green-400",
                getFieldState('email') === 'default' && "border-gray-300 dark:border-gray-600"
              )}
              placeholder="john@example.com"
            />
            <AnimatePresence>
              {getFieldState('email') === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {errors.email && touched.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Message Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <MessageSquare className="inline w-4 h-4 mr-1" />
            Message
            <span className="ml-2 text-xs text-gray-500">
              ({formData.message.length}/500)
            </span>
          </label>
          <div className="relative">
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange('message')}
              onBlur={handleBlur('message')}
              rows={5}
              className={cn(
                "w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-none",
                "focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500",
                "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
                "placeholder-gray-400 dark:placeholder-gray-500",
                getFieldState('message') === 'error' && "border-red-500 dark:border-red-400",
                getFieldState('message') === 'success' && "border-green-500 dark:border-green-400",
                getFieldState('message') === 'default' && "border-gray-300 dark:border-gray-600"
              )}
              placeholder="Tell us about your project..."
            />
            <AnimatePresence>
              {getFieldState('message') === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute right-3 top-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {errors.message && touched.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            type="submit"
            variant="primary"
            size="large"
            disabled={isSubmitting}
            className={cn(
              "w-full relative overflow-hidden",
              "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
              "transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
              "shadow-lg hover:shadow-xl"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </motion.div>

        {/* Privacy note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-center text-gray-500 dark:text-gray-400"
        >
          By submitting this form, you agree to our{' '}
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
            Terms of Service
          </a>
        </motion.p>
      </motion.form>
    </>
  )
}