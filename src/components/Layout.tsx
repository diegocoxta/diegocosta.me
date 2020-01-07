import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { PageRendererProps } from 'gatsby';

import Header from './Header';
import Footer from './Footer';

interface LayoutProps extends PageRendererProps {
  title: String;
  children: React.ReactElement;
};

const GlobalStyle = createGlobalStyle`
  body {
    background: #0e0f11;
    font-family: 'Raleway', sans-serif;
    color: #fff;
  }
`;

const Container = styled.section`
  margin: auto;
  max-width: 800px;
  padding: 20px;
`;

function Layout(props: LayoutProps) {
  const { location, children } = props;
  
  return (
    <Container>
      <GlobalStyle />
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  );
}
  
  export default Layout;
  