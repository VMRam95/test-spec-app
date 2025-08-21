import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      startIcon,
      endIcon,
      id,
      className,
      type = 'text',
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
    
    return (
      <div className={`relative ${fullWidth ? 'w-full' : 'w-auto'}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={twMerge(
              'block mb-2 text-sm font-medium',
              'text-gray-700 dark:text-gray-200',
              disabled && 'opacity-50'
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {startIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={twMerge(
              'block px-4 py-2 w-full rounded-md border',
              'text-sm text-gray-900 dark:text-white',
              'bg-white dark:bg-gray-800',
              'border-gray-300 dark:border-gray-600',
              'focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
              'focus:border-blue-500 dark:focus:border-blue-400',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              startIcon && 'pl-10',
              endIcon && 'pr-10',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              className
            )}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {endIcon}
            </div>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-1 text-sm text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;