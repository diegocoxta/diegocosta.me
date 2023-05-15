import React, { PropsWithChildren } from 'react';
import styled, { createGlobalStyle, ThemeContext } from 'styled-components';

import { useTheme, ThemeScheme, themeLight, themeDark } from '~/hooks/useTheme';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

const GlobalStyle = createGlobalStyle<{ theme: ThemeScheme }>`
  body {
    background: ${({ theme }) => theme.backgroundColor};
    font-family: 'Source Sans Pro', sans-serif;
    color: ${({ theme }) => theme.textColor};
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.section`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Divisor = styled.div`
  background: linear-gradient(90deg, ${({ theme }) => theme.backgroundColor} 20px, transparent 1%) center,
    linear-gradient(${({ theme }) => theme.backgroundColor} 20px, transparent 1%) center,
    ${({ theme }) => theme.textColor};
  background-size: 22px 22px;
  height: 120px;
  margin: 40px 0;
  width: 100%;
`;

interface LayoutProps {
  showAboutMe: boolean;
  metatags?: {
    title?: string;
    description?: string;
  };
}

export default function Layout(props: PropsWithChildren<LayoutProps>): React.ReactElement {
  const [theme, themeToggler, setMode] = useTheme();
  const themeMode = theme === 'light' ? themeLight : themeDark;

  return (
    <ThemeContext.Provider value={{ ...themeMode, theme, themeToggler, setMode }}>
      <GlobalStyle />
      <Container>
        <Header metatags={props.metatags} showAboutMe={props.showAboutMe} />
      </Container>
      <Divisor />
      <Container>
        {props.children}
        <Footer />
      </Container>
    </ThemeContext.Provider>
  );
}

Layout.defaultProps = {
  showAboutMe: false,
};
