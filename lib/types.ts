// Type definitions for the landing page

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode | string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface HeroContent {
  title: string;
  subtitle?: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  };
  secondaryCTA?: {
    text: string;
    href: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  };
  backgroundImage?: string;
  backgroundVideo?: string;
}

export interface CardProps {
  title: string;
  description?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  fullWidth?: boolean;
}

export interface ThemeConfig {
  defaultTheme: 'light' | 'dark' | 'system';
  enableSystem?: boolean;
  storageKey?: string;
  attribute?: string;
  enableColorScheme?: boolean;
}

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots?: string;
  author?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  icon?: React.ReactNode;
  children?: NavigationItem[];
  active?: boolean;
}

export interface FooterSection {
  title: string;
  links: NavigationItem[];
}

export interface SocialLink {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'github' | 'instagram' | 'youtube';
  url: string;
  label?: string;
}

export interface FormValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  validation?: FormValidationRule[];
  options?: Array<{ value: string; label: string }>;
  defaultValue?: string | boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface EmailValidationResult {
  valid: boolean;
  error?: string;
}

export interface ResponsiveBreakpoint {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

export interface AccessibilityConfig {
  ariaLabels?: Record<string, string>;
  skipLinks?: boolean;
  keyboardNavigation?: boolean;
  screenReaderText?: Record<string, string>;
}

export type Theme = 'light' | 'dark' | 'system';

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type FormSubmitHandler = (data: ContactFormData) => void | Promise<void>;

export type ValidationFunction = (value: string) => string | undefined;

export type ClassName = string | undefined | null | false;

export interface ComponentBaseProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'data-testid'?: string;
}