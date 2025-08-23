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

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Feature {
  id: string
  title: string
  description: string
  icon?: string
  enabled: boolean
}

export interface Project {
  id: string
  name: string
  description: string
  imageUrl?: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
}

export interface NavigationItem {
  name: string
  href: string
  current: boolean
  icon?: React.ComponentType<{ className?: string }>
}

export interface Theme {
  mode: 'light' | 'dark'
  primaryColor: string
  secondaryColor: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}