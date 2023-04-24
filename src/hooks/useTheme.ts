import { useEffect, useState } from 'react';

export const useTheme = (): [string, () => void, (color: 'light' | 'dark') => void] => {
  const defaultTheme = 'light';
  const [theme, setTheme] = useState(defaultTheme);

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

  return [theme, themeToggler, setMode];
};
