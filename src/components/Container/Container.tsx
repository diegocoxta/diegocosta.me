import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Header from '../Header';
import Footer from '../Footer';

const Wrapper = styled.section`
  margin: auto;
  max-width: 800px;
  padding: 20px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: #0e0f11;
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

export interface ContainerProps {
  children: React.ReactElement;
  small?: boolean;
}

export default function Container(props: ContainerProps): React.ReactElement {
  return (
    <Wrapper>
      <GlobalStyle />
      <Header small={props.small || false} />
      <main>{props.children}</main>
      <Footer />
    </Wrapper>
  );
}
