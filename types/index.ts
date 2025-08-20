// Theme types
export type Theme = 'light' | 'dark';

// Hero section types
export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

// Feature types
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon component name or path
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Form validation response type
export interface ValidationResponse {
  isValid: boolean;
  errors?: ContactFormErrors;
}

// SEO and metadata types
export interface MetaData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

// Theme context types
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Feature grid layout options
export interface GridConfig {
  columns: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap: string;
}

// Component common props
export interface BaseProps {
  className?: string;
  id?: string;
  'aria-label'?: string;
}

// Responsive image props
export interface ResponsiveImageProps extends BaseProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Form submission response
export interface FormSubmissionResponse {
  success: boolean;
  message: string;
}