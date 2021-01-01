import { useEffect, useState } from 'react';

export const useTheme = (): [string, () => void] => {
  const [theme, setTheme] = useState('dark');

  const setMode = (mode: string) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    setMode(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');

    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  return [theme, themeToggler];
};
