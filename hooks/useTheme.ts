'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted state to handle hydration mismatch
    setMounted(true);
    
    // Check for system preference
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    // Get stored theme or use system preference
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = storedTheme || systemPreference;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  // Handle theme changes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return {
    theme,
    toggleTheme,
    mounted, // Used to prevent hydration mismatch
    isDark: theme === 'dark'
  } as const;
}