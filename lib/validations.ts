/**
 * Validation utilities for the simple-landing-page application
 * Provides type-safe validation functions for forms and input fields
 */

// Types for validation results
export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns ValidationResult with validation status and message
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!email) {
    return {
      isValid: false,
      message: 'Email is required'
    };
  }

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address'
    };
  }

  return {
    isValid: true,
    message: ''
  };
};

/**
 * Validates required fields
 * @param value - The value to check
 * @param fieldName - Name of the field being validated
 * @returns ValidationResult with validation status and message
 */
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim().length === 0) {
    return {
      isValid: false,
      message: `${fieldName} is required`
    };
  }

  return {
    isValid: true,
    message: ''
  };
};

/**
 * Validates minimum length of a string
 * @param value - The string to validate
 * @param minLength - Minimum required length
 * @param fieldName - Name of the field being validated
 * @returns ValidationResult with validation status and message
 */
export const validateMinLength = (
  value: string,
  minLength: number,
  fieldName: string
): ValidationResult => {
  if (value.length < minLength) {
    return {
      isValid: false,
      message: `${fieldName} must be at least ${minLength} characters long`
    };
  }

  return {
    isValid: true,
    message: ''
  };
};

/**
 * Validates a contact form submission
 * @param data - Form data object containing email and other fields
 * @returns FormValidationResult with overall validation status and field-specific errors
 */
export const validateContactForm = (data: {
  email: string;
  name: string;
  message: string;
}): FormValidationResult => {
  const errors: Record<string, string> = {};
  
  // Validate email
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }

  // Validate name
  const nameValidation = validateRequired(data.name, 'Name');
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message;
  }

  // Validate message
  const messageValidation = validateMinLength(data.message, 10, 'Message');
  if (!messageValidation.isValid) {
    errors.message = messageValidation.message;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Sanitizes user input to prevent XSS attacks
 * @param input - The string to sanitize
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};