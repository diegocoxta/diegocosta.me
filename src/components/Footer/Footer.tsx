import React from 'react';
import styled from 'styled-components';

import Navigation from '~/components/Navigation';

const Container = styled.footer`
  margin-bottom: 50px;

  nav {
    margin-bottom: 50px;
  }

  @media (min-width: 760px) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;

    nav {
      margin-bottom: 0;
    }
  }
`;

const Content = styled.div`
  font-size: 16px;

  @media (min-width: 760px) {
    font-size: 18px;
  }
`;

const Label = styled.span`
  color: ${({ theme }) => theme.textColor};
`;

const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener',
})`
  color: ${({ theme }) => theme.accentColor};
  text-decoration: none;
  box-shadow: none;

  :hover,
  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.accentColor};
    outline: none;
  }
`;

interface FooterProps {
  year: number;
  repository?: string;
}

export default function Footer(props: FooterProps): React.ReactElement {
  return (
    <Container>
      <Navigation />
      <Content>
        <Label>CC-BY {props.year}, built with </Label>
        <Link href="https://gatsbyjs.org">gatsby</Link>
        <Label> • </Label>
        {props.repository && <Link href={props.repository}>source code</Link>}
      </Content>
    </Container>
  );
}
