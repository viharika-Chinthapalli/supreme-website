export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface CompanyInfo {
  address: string;
  phone: string;
  email: string;
}

export interface SocialMedia {
  platform: string;
  url: string;
  icon: string;
}

export interface FooterSection {
  title: string;
  links: NavigationItem[];
}

export interface AnimationConfig {
  initial: object;
  animate: object;
  transition: object;
}

export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  as?: 'input' | 'textarea';
  rows?: number;
}

export interface ContactContextType {
  formData: ContactFormData;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  updateField: (field: keyof ContactFormData, value: string) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
}

export interface MotionVariants {
  hidden: object;
  visible: object;
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specifications: Record<string, string>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ContactSubmissionResponse extends ApiResponse {
  data?: {
    id: string;
    submittedAt: string;
  };
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

export interface Breakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
}

export type InputRef = HTMLInputElement | HTMLTextAreaElement;
export type ButtonRef = HTMLButtonElement;
export type SectionRef = HTMLElement;

export type FormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;
export type ClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;
export type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;