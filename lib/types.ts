export interface FormData {
  name: string
  email: string
  message: string
}

export interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export interface Feature {
  title: string
  description: string
  icon?: string
}

export interface NavItem {
  label: string
  href: string
  external?: boolean
}

export interface Theme {
  mode: 'light' | 'dark'
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ContactFormSubmission {
  id: string
  name: string
  email: string
  message: string
  createdAt: Date
  status: 'pending' | 'read' | 'replied'
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'