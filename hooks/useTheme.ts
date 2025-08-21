'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  systemTheme: Theme | undefined;
}

export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<Theme>('light');
  const [systemTheme, setSystemTheme] = useState<Theme | undefined>(undefined);

  // Handle initial theme setup
  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemPreference: Theme = prefersDark ? 'dark' : 'light';
    setSystemTheme(systemPreference);

    // Set initial theme
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      setTheme(systemPreference);
      document.documentElement.classList.toggle('dark', systemPreference === 'dark');
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme: Theme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
      
      // Only update theme if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(newSystemTheme);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeValue(newTheme);
  };

  return {
    theme,
    toggleTheme,
    setTheme: setThemeValue,
    systemTheme,
  };
}