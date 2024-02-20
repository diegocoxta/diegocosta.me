import React from 'react';
import { createGlobalStyle, ThemeContext } from 'styled-components';

import { useTheme, themeLight, themeDark } from '~/hooks/useTheme';

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.backgroundColor};
    font-family: 'Source Sans Pro', sans-serif;
    color: ${({ theme }) => theme.textColor};
    margin: 0;
    padding: 0;
  }
`;

export default function ThemeProvider(props: React.PropsWithChildren) {
  const [theme, themeToggler, setMode] = useTheme();
  const themeMode = theme === 'light' ? themeLight : themeDark;

  return (
    <ThemeContext.Provider value={{ ...themeMode, theme, themeToggler, setMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
