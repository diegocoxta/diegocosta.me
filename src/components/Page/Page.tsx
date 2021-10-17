import React from 'react';
import { createGlobalStyle, ThemeContext } from 'styled-components';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

import { useTheme } from '~/hooks/useTheme';
import { dark, light } from '~/themes';

type CustomTheme = typeof dark;

const GlobalStyle = createGlobalStyle<{ theme: CustomTheme }>`
  body {
    background: ${({ theme }) => theme.backgroundColor};
    font-family: 'Raleway', sans-serif;
    color: #fff;
    margin: 0;
    padding: 0;
  }
`;

export interface PageProps {
  children: React.ReactNode;
}

export default function Page(props: PageProps): React.ReactElement {
  const [theme, themeToggler] = useTheme();

  const themeMode = theme === 'light' ? light : dark;

  return (
    <ThemeContext.Provider value={{ ...themeMode, theme, themeToggler }}>
      <GlobalStyle />
      <Header />
      <main>{props.children}</main>
      <Footer />
    </ThemeContext.Provider>
  );
}
