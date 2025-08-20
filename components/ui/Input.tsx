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
      className,
      id,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={twMerge('relative', fullWidth ? 'w-full' : 'w-auto')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
          >
            {label}
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
            aria-label={ariaLabel || label}
            aria-invalid={!!error}
            aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`}
            className={twMerge(
              'block px-4 py-2 w-full text-gray-900 bg-white border rounded-lg',
              'dark:bg-gray-800 dark:text-white dark:border-gray-600',
              'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-red-500 dark:border-red-500',
              startIcon && 'pl-10',
              endIcon && 'pr-10',
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
            id={errorId}
            className="mt-1 text-sm text-red-600 dark:text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={helperId}
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