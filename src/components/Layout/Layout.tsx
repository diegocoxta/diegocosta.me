import React from 'react';
import { createGlobalStyle, ThemeContext } from 'styled-components';

import Header from '~/components/Header';
import LanguageSwitcher from '~/components/LanguageSwitcher';
import Footer from '~/components/Footer';

import { useTheme } from '~/hooks/useTheme';
import { dark, light } from '~/themes';

type CustomTheme = typeof dark;

const GlobalStyle = createGlobalStyle<{ theme: CustomTheme }>`
  body {
    background: ${({ theme }) => theme.backgroundColor};
    font-family: 'Source Sans Pro', sans-serif;
    color: ${({ theme }) => theme.textColor};
    margin: 0;
    padding: 0;
  }
`;

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps): React.ReactElement {
  const [theme, themeToggler, setMode] = useTheme();

  const themeMode = theme === 'light' ? light : dark;

  return (
    <ThemeContext.Provider value={{ ...themeMode, theme, themeToggler, setMode }}>
      <GlobalStyle />
      <LanguageSwitcher />
      <Header />
      <main>{props.children}</main>
      <Footer />
    </ThemeContext.Provider>
  );
}
