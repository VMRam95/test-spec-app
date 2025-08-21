/**
 * Validation utilities for the simple-landing-page application
 * Provides type-safe validation functions for forms and input fields
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
  if (!email.trim()) {
    return {
      isValid: false,
      message: 'Email is required',
    };
  }

  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return {
    isValid: emailRegex.test(email),
    message: emailRegex.test(email) ? 'Valid email' : 'Please enter a valid email address',
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

  if (field.minLength && field.value.trim().length < field.minLength) {
    return {
      isValid: false,
      message: `Minimum ${field.minLength} characters required`,
    };
  }

  if (field.maxLength && field.value.trim().length > field.maxLength) {
    return {
      isValid: false,
      message: `Maximum ${field.maxLength} characters allowed`,
    };
  }

  return {
    isValid: true,
    message: 'Valid input',
  };
};

/**
 * Validates a phone number (basic format)
 * @param phone - The phone number to validate
 * @returns ValidationResult with validation status and message
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone.trim()) {
    return {
      isValid: true, // Phone might be optional
      message: '',
    };
  }

  // Basic phone number validation (allows various formats)
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

  return {
    isValid: phoneRegex.test(phone),
    message: phoneRegex.test(phone) ? 'Valid phone number' : 'Please enter a valid phone number',
  };
};

/**
 * Validates form data object
 * @param data - Object containing form field values
 * @param rules - Validation rules for each field
 * @returns Object with validation results for each field
 */
export const validateForm = (
  data: Record<string, string>,
  rules: Record<string, FieldValidation>
): Record<string, ValidationResult> => {
  const results: Record<string, ValidationResult> = {};

  Object.entries(rules).forEach(([field, rule]) => {
    const value = data[field] || '';
    
    // Apply required field validation
    const requiredCheck = validateRequired({
      value,
      required: rule.required,
      minLength: rule.minLength,
      maxLength: rule.maxLength,
    });

    if (!requiredCheck.isValid) {
      results[field] = requiredCheck;
      return;
    }

    // Apply specific validations based on field type
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
          message: 'Valid input',
        };
    }
  });

  return results;
};