// Types for validation results
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// Email validation regex pattern
// This pattern follows RFC 5322 standards
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns ValidationResult object
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return {
      isValid: false,
      message: 'Email is required',
    };
  }

  if (email.length > 254) {
    return {
      isValid: false,
      message: 'Email is too long',
    };
  }

  if (!EMAIL_REGEX.test(email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address',
    };
  }

  return {
    isValid: true,
  };
};

/**
 * Validates required fields
 * @param value - The value to check
 * @param fieldName - Name of the field for the error message
 * @returns ValidationResult object
 */
export const validateRequired = (value: unknown, fieldName: string): ValidationResult => {
  if (value === undefined || value === null || value === '') {
    return {
      isValid: false,
      message: `${fieldName} is required`,
    };
  }

  return {
    isValid: true,
  };
};

/**
 * Validates string length
 * @param value - The string to validate
 * @param options - Min and max length options
 * @returns ValidationResult object
 */
export const validateLength = (
  value: string,
  options: { min?: number; max?: number }
): ValidationResult => {
  const { min, max } = options;

  if (min && value.length < min) {
    return {
      isValid: false,
      message: `Must be at least ${min} characters`,
    };
  }

  if (max && value.length > max) {
    return {
      isValid: false,
      message: `Must not exceed ${max} characters`,
    };
  }

  return {
    isValid: true,
  };
};

/**
 * Validates a phone number format
 * Accepts various formats including international
 * @param phone - The phone number to validate
 * @returns ValidationResult object
 */
export const validatePhone = (phone: string): ValidationResult => {
  // Remove all non-numeric characters for validation
  const cleanPhone = phone.replace(/\D/g, '');

  if (cleanPhone.length < 10 || cleanPhone.length > 15) {
    return {
      isValid: false,
      message: 'Please enter a valid phone number',
    };
  }

  return {
    isValid: true,
  };
};

/**
 * Validates a URL format
 * @param url - The URL to validate
 * @returns ValidationResult object
 */
export const validateUrl = (url: string): ValidationResult => {
  try {
    new URL(url);
    return {
      isValid: true,
    };
  } catch {
    return {
      isValid: false,
      message: 'Please enter a valid URL',
    };
  }
};