import React from 'react';
import { createGlobalStyle, ThemeContext } from 'styled-components';
import { MDXProvider } from '@mdx-js/react';

import Header from '~/components/Header';
import LanguageSwitcher from '~/components/LanguageSwitcher';
import Footer from '~/components/Footer';

import Talk from '~/components/Talk';
import Divisor from '~/components/Divisor';

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

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps): React.ReactElement {
  const [theme, themeToggler] = useTheme();

  const themeMode = theme === 'light' ? light : dark;

  const mdxComponents = {
    Talk,
    Divisor,
  };

  return (
    <ThemeContext.Provider value={{ ...themeMode, theme, themeToggler }}>
      <GlobalStyle />
      <LanguageSwitcher />
      <Header />
      <MDXProvider components={{ ...mdxComponents }}>
        <main>{props.children}</main>
      </MDXProvider>
      <Footer />
    </ThemeContext.Provider>
  );
}
