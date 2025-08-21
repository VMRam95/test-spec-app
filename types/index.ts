// Theme types
export type Theme = 'light' | 'dark'

// Hero section types
export interface HeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  imageUrl?: string
}

// Feature types
export interface Feature {
  id: string
  title: string
  description: string
  icon: string // Icon component or path
}

export interface FeatureCardProps {
  feature: Feature
}

export interface FeaturesGridProps {
  features: Feature[]
  title?: string
  subtitle?: string
}

// Contact form types
export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>
}

// Form validation types
export interface ValidationResult {
  isValid: boolean
  message?: string
}

// Theme toggle types
export interface ThemeToggleProps {
  theme: Theme
  onThemeChange: (theme: Theme) => void
}

// SEO types
export interface SEOMetadata {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonicalUrl?: string
}

// Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

// Utility types
export type ResponsiveValue<T> = {
  mobile: T
  tablet?: T
  desktop: T
}

// Component common props
export interface BaseComponentProps {
  className?: string
  id?: string
  'aria-label'?: string
}