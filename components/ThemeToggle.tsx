'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-10 h-10 ${className}`} aria-hidden="true">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-full" />
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`
        relative inline-flex items-center justify-center w-10 h-10
        rounded-lg bg-gray-200 dark:bg-gray-800
        hover:bg-gray-300 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        transition-colors duration-200 ease-in-out
        ${className}
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 transform transition-transform duration-200 
          ${theme === 'dark' ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}
          absolute text-yellow-500`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 2v1m0 18v1m9-10h1M2 12h1m15.5-6.5l.5-.5M5 5l-.5-.5m14.5 14.5l.5.5M5 19l-.5.5M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 transform transition-transform duration-200
          ${theme === 'dark' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}
          absolute text-blue-200`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}