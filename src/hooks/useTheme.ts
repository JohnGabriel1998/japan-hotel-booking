import { useKV } from '@github/spark/hooks';
import { useEffect } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useKV<Theme>('app-theme', 'light');
  
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
  };
  
  return {
    theme: theme || 'light',
    setTheme,
    toggleTheme,
    isDark: theme === 'dark'
  };
}