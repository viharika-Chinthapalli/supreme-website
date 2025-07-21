export const COMPANY_INFO = {
  name: 'Supreme Group',
  tagline: 'Performance in motion',
  description: 'Leading provider of soft trims and NVH solutions for seamless rides',
  address: '110, 11th Road, Chembur, Mumbai - 400071',
  phone: '+91 22 2520 8622',
  email: 'info@supremegroup.co.in',
  website: 'https://supremegroup.co.in',
  founded: '1995'
} as const;

export const NAVIGATION_ITEMS = [
  { label: 'Applications', href: '#applications' },
  { label: 'Appliances', href: '#appliances' },
  { label: 'Automotive', href: '#automotive' },
  { label: 'Furniture', href: '#furniture' },
  { label: 'Customized Solutions', href: '#solutions' }
] as const;

export const SOCIAL_MEDIA = {
  twitter: 'https://twitter.com/supremegroup',
  linkedin: 'https://linkedin.com/company/supreme-group',
  instagram: 'https://instagram.com/supremegroup',
  youtube: 'https://youtube.com/supremegroup'
} as const;

export const BUSINESS_HOURS = {
  weekdays: 'Mon - Fri: 9:00 AM - 6:00 PM',
  weekend: 'Sat - Sun: Closed',
  timezone: 'IST (GMT+5:30)'
} as const;

export const API_ENDPOINTS = {
  contact: '/api/contact',
  newsletter: '/api/newsletter',
  products: '/api/products',
  services: '/api/services'
} as const;

export const VALIDATION_RULES = {
  fullName: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 100
  },
  subject: {
    minLength: 3,
    maxLength: 100
  },
  message: {
    minLength: 10,
    maxLength: 1000
  }
} as const;

export const ANIMATION_CONFIG = {
  pageTransition: {
    duration: 0.6,
    ease: 'easeInOut'
  },
  
  scrollReveal: {
    duration: 0.8,
    delay: 0.2,
    ease: 'easeOut'
  },
  
  hoverScale: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  
  buttonTap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  
  loading: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'linear'
  }
} as const;

export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
  ultrawide: '1920px'
} as const;

export const THEME_COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#0EA5E9',
    600: '#0284c7',
    700: '#0369a1',
    900: '#0c4a6e'
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    600: '#475569',
    800: '#1e293b',
    900: '#0f172a'
  }
} as const;

export const SEO_CONFIG = {
  defaultTitle: 'Supreme Group - Soft Trims and NVH Solutions',
  titleTemplate: '%s | Supreme Group',
  defaultDescription: 'Leading provider of soft trims and NVH solutions for seamless rides. Performance in motion with 360-degree nonwoven solutions.',
  siteUrl: 'https://supremegroup.co.in',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@supremegroup'
} as const;

export const FEATURE_FLAGS = {
  enableAnimations: true,
  enableAnalytics: process.env.NODE_ENV === 'production',
  enableContactForm: true,
  enableNewsletterSignup: false,
  enableChatWidget: false,
  enableDarkMode: false
} as const;

export const PERFORMANCE_CONFIG = {
  imageQuality: 80,
  imageSizes: [640, 768, 1024, 1280, 1536],
  
  lazyLoadOffset: 100,
  
  cacheMaxAge: 3600,
  
  chunkSizeWarningLimit: 500
} as const;

export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection and try again.',
  server: 'Server error. Please try again later.',
  validation: 'Please check your input and try again.',
  generic: 'Something went wrong. Please try again.',
  formSubmission: 'Failed to send message. Please try again.',
  emailInvalid: 'Please enter a valid email address.',
  fieldRequired: 'This field is required.',
  fieldTooShort: 'This field is too short.',
  fieldTooLong: 'This field is too long.'
} as const;

export const SUCCESS_MESSAGES = {
  formSubmitted: 'Thank you for your message! We\'ll get back to you within 24 hours.',
  newsletterSignup: 'Successfully subscribed to our newsletter!',
  fileUploaded: 'File uploaded successfully.',
  dataUpdated: 'Information updated successfully.'
} as const;

export const LOADING_STATES = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error'
} as const;

export const STORAGE_KEYS = {
  userPreferences: 'supreme_user_preferences',
  contactFormDraft: 'supreme_contact_draft',
  themeMode: 'supreme_theme_mode',
  analyticsConsent: 'supreme_analytics_consent'
} as const;

export const A11Y_CONFIG = {
  skipLinkText: 'Skip to main content',
  ariaLabels: {
    mainNavigation: 'Main navigation',
    socialMedia: 'Social media links',
    contactForm: 'Contact form',
    companyLogo: 'Supreme Group homepage'
  },
  focusableElements: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
} as const;

export default {
  COMPANY_INFO,
  NAVIGATION_ITEMS,
  SOCIAL_MEDIA,
  BUSINESS_HOURS,
  API_ENDPOINTS,
  VALIDATION_RULES,
  ANIMATION_CONFIG,
  BREAKPOINTS,
  THEME_COLORS,
  SEO_CONFIG,
  FEATURE_FLAGS,
  PERFORMANCE_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LOADING_STATES,
  STORAGE_KEYS,
  A11Y_CONFIG
};