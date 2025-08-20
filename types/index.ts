// Theme types
export type Theme = 'light' | 'dark';

// Hero section types
export interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl?: string;
}

// Feature types
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon component name or path
}

export interface FeatureCardProps {
  feature: Feature;
}

export interface FeaturesGridProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

// Form validation types
export interface ValidationError {
  field: keyof ContactFormData;
  message: string;
}

// Theme toggle types
export interface ThemeToggleProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

// SEO types
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

// Layout types
export interface LayoutProps {
  children: React.ReactNode;
  metadata?: SEOMetadata;
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Form submission response
export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  timestamp: string;
}