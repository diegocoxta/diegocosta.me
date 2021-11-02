import React from 'react';
import { createGlobalStyle, ThemeContext } from 'styled-components';
import { MDXProvider } from '@mdx-js/react';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Talk from '~/components/Talk';
import LanguageSwitcher from '~/components/LanguageSwitcher';

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

  const mdxComponents = {
    Talk,
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
