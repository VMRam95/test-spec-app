/**
 * Validation utilities for the simple-landing-page application
 * Provides type-safe validation functions for forms and user inputs
 */

// Type for validation result
export type ValidationResult = {
  isValid: boolean;
  message: string;
};

// Type for form field validation
export type FieldValidation = {
  value: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
};

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns ValidationResult with validation status and message
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return {
      isValid: false,
      message: 'Email is required',
    };
  }

  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const isValid = emailRegex.test(email);
  return {
    isValid,
    message: isValid ? '' : 'Please enter a valid email address',
  };
};

/**
 * Validates required fields
 * @param field - The field value and validation requirements
 * @returns ValidationResult with validation status and message
 */
export const validateRequired = (field: FieldValidation): ValidationResult => {
  if (field.required && !field.value.trim()) {
    return {
      isValid: false,
      message: 'This field is required',
    };
  }

  if (field.minLength && field.value.length < field.minLength) {
    return {
      isValid: false,
      message: `Minimum ${field.minLength} characters required`,
    };
  }

  if (field.maxLength && field.value.length > field.maxLength) {
    return {
      isValid: false,
      message: `Maximum ${field.maxLength} characters allowed`,
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

/**
 * Validates a phone number (optional utility)
 * @param phone - The phone number to validate
 * @returns ValidationResult with validation status and message
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return {
      isValid: true, // Phone is optional
      message: '',
    };
  }

  // Basic phone number validation (allows various formats)
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  const isValid = phoneRegex.test(phone);

  return {
    isValid,
    message: isValid ? '' : 'Please enter a valid phone number',
  };
};

/**
 * Validates form data object
 * @param data - Object containing form field values
 * @param schema - Validation schema defining required fields
 * @returns Object with validation results for each field
 */
export const validateForm = (
  data: Record<string, string>,
  schema: Record<string, FieldValidation>
): Record<string, ValidationResult> => {
  const results: Record<string, ValidationResult> = {};

  Object.entries(schema).forEach(([field, requirements]) => {
    const value = data[field] || '';
    
    // Apply required field validation
    const requiredCheck = validateRequired({
      value,
      ...requirements,
    });

    if (!requiredCheck.isValid) {
      results[field] = requiredCheck;
      return;
    }

    // Apply specific field validations
    switch (field) {
      case 'email':
        results[field] = validateEmail(value);
        break;
      case 'phone':
        results[field] = validatePhone(value);
        break;
      default:
        results[field] = {
          isValid: true,
          message: '',
        };
    }
  });

  return results;
};