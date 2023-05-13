import { useEffect, useState } from 'react';

const colors = {
  AMBER: '#E5A53B',
  BROWN: '#7C5B34',
  COBALT: '#1B56E6',
  CRIMSON: '#941D2A',
  CYAN: '#4BA0DC',
  MAGENTA: '#C62C72',
  LIME: '#AAC13D',
  INDIGO: '#602AF5',
  GREEN: '#72A537',
  EMERALD: '#3C8725',
  MAUVE: '#726287',
  OLIVE: '#728567',
  ORANGE: '#E9702D',
  PINK: '#E47BCC',
  RED: '#D2321F',
  SIENNA: '#723E40',
  STEEL: '#687585',
  TEAL: '#4BA8A8',
  VIOLET: '#9B31F6',
  YELLOW: '#D4C03F',
  TAUPE: '#87794E',
  CLOUDS: '#EDF0F1',
  MIDNIGHTBLUE: '#2F3D4F',
  WETASPHALT: '#38485D',
  SILVER: '#BEC3C7',
  BLACK: '#0E1116',
  REVOLUTION: '#CC433C',
};

export type ThemeScheme = {
  titleColor: string;
  subtitleColor: string;
  textColor: string;
  backgroundColor: string;
  accentColor: string;
};

export const themeDark: ThemeScheme = {
  titleColor: colors.CLOUDS,
  subtitleColor: colors.SILVER,
  textColor: colors.CLOUDS,
  backgroundColor: colors.BLACK,
  accentColor: colors.LIME,
};

export const themeLight: ThemeScheme = {
  titleColor: colors.MIDNIGHTBLUE,
  subtitleColor: colors.WETASPHALT,
  textColor: colors.MIDNIGHTBLUE,
  backgroundColor: '#ffffff',
  accentColor: colors.LIME,
};

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
