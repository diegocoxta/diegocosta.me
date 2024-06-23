import React from 'react';
import styled from 'styled-components';
import { KBarProvider, KBarProviderProps } from 'kbar';

import BaseContainer from './Container';
import Logo, { LogoProps } from './Logo';
import Navigation from './Navigation';
import ThemeSwitcher from './ThemeSwitcher';

const Container = styled(BaseContainer)`
  margin: 16px auto 40px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 760px) {
    margin: 40px auto 40px auto;
  }
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export interface HeaderProps {
  name: LogoProps['name'];
  actions: KBarProviderProps['actions'];
}

export default function Header(props: HeaderProps): React.ReactElement {
  return (
    <Container>
      <Logo name={props.name} size="large" />
      <NavBar>
        <ThemeSwitcher />
        <KBarProvider actions={props.actions}>
          <Navigation />
        </KBarProvider>
      </NavBar>
    </Container>
  );
}
