// Theme types
export type Theme = 'light' | 'dark';

// Hero section types
export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl?: string;
  imageAlt?: string;
}

// Features grid types
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
}

export interface FeaturesGridProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
}

// Feature card types
export interface FeatureCardProps {
  feature: Feature;
  className?: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  className?: string;
}

// Form validation types
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// SEO and metadata types
export interface MetaData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

// Theme toggle types
export interface ThemeToggleProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  className?: string;
}

// Common component props
export interface BaseProps {
  className?: string;
  id?: string;
  'aria-label'?: string;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}