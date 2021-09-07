import React from 'react';
import styled, { createGlobalStyle, ThemeContext } from 'styled-components';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Search from '~/components/Search';
import Navigation from '~/components/Navigation';

import { useTheme } from '~/hooks/useTheme';
import { dark, light } from '~/themes';

const Wrapper = styled.section`
  margin: auto;
  max-width: 800px;
  padding: 20px;
`;

type CustomTheme = typeof dark;

const GlobalStyle = createGlobalStyle<{ theme: CustomTheme }>`
  body {
    background: ${({ theme }) => theme.backgroundColor};
    font-family: 'Raleway', sans-serif;
    color: #fff;
  }

  .gist-data { border: 0px !important; }

  .gist-data tbody, .gist .highlight, .gist .gist-data { background-color: #0e0f11 !important; }

  .gist .gist-file { border: 0px !important; }

  .gist-meta { background: transparent !important; }

  .gist-data tbody td:nth-of-type(1) { color: #2B91AF !important; }

  .gist-data tbody td:nth-of-type(2){ color: #FFFFFF !important; }

  .pl-c { color: #57A64A !important; }

  .pl-k, tbody tr:first-child .blob-code, tbody tr:last-child .blob-code { color: #569CD6 !important; }

  .pl-en { color: #FFFFFF !important; }

  .pl-c1 { color: #FFFFFF !important; }

  .pl-pds { color: #D69D85 !important; }

  .pl-s { color: #D69D85 !important; }
`;

const OnlyMobile = styled.div`
  @media (min-width: 760px) {
    display: none;
  }
`;

export interface ContainerProps {
  children: React.ReactNode;
  small?: boolean;
}

export default function Container(props: ContainerProps): React.ReactElement {
  const [theme, themeToggler] = useTheme();

  const themeMode = theme === 'light' ? light : dark;

  return (
    <ThemeContext.Provider value={{ ...themeMode, theme, themeToggler }}>
      <Wrapper>
        <GlobalStyle />
        <Header small={props.small || false} />
        <OnlyMobile>
          <Navigation />
        </OnlyMobile>
        {!props.small && <Search />}
        <main>{props.children}</main>
        {props.small && <Search />}
        <Footer />
      </Wrapper>
    </ThemeContext.Provider>
  );
}
