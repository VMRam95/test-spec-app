'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true once the component is mounted
    setMounted(true);
    
    // Check for system preference and localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    // Set initial theme
    setTheme(savedTheme || systemPreference);

    // Apply theme to document
    document.documentElement.classList.toggle('dark', savedTheme === 'dark' || (!savedTheme && systemPreference === 'dark'));
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  // Handle theme set
  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return {
    theme,
    setTheme: setThemeValue,
    toggleTheme,
    mounted // Used to prevent hydration mismatch
  };
}