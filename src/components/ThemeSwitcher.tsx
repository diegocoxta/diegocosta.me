import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext, createGlobalStyle } from 'styled-components';
import { BsMoon, BsSun } from 'react-icons/bs';

import { themeDark, themeLight } from '~/../content/colors';

export type ThemeScheme = {
  titleColor: string;
  subtitleColor: string;
  textColor: string;
  backgroundColor: string;
  accentColor: string;
};

export type ColorScheme = 'light' | 'dark';

const Container = styled.button<{ $enabled?: boolean }>`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.accentColor};
  border-radius: 18px;
  height: 34px;
  width: 50px;
  padding: 0px;
  display: flex;
  justify-content: ${({ $enabled }) => ($enabled ? 'flex-start' : 'flex-end')};
  transition: all 1s linear;
  margin: 0 20px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Indicator = styled.div`
  height: 30px;
  width: 30px;
  background: ${({ theme }) => theme.accentColor};
  border-radius: 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.backgroundColor};
    font-family: 'Source Sans Pro', sans-serif;
    color: ${({ theme }) => theme.textColor};
    margin: 0;
    padding: 0;
  }
`;

export const useTheme = (): [string, () => void, (color: ColorScheme) => void] => {
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

export function ThemeProvider(props: React.PropsWithChildren) {
  const [theme, themeToggler, setMode] = useTheme();
  const themeMode = theme === 'light' ? themeLight : themeDark;

  return (
    <ThemeContext.Provider value={{ ...themeMode, theme, themeToggler, setMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default function ThemeSwitcher(): React.ReactElement {
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.theme === 'dark';

  return (
    <Container aria-label="Change color scheme" $enabled={isDarkMode} onClick={themeContext?.themeToggler}>
      <Indicator>{isDarkMode ? <BsMoon /> : <BsSun />}</Indicator>
    </Container>
  );
}
