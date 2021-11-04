import React from 'react';
import styled from 'styled-components';

import { Link } from '~/utils/i18n';
import Container from '~/components/Container';
import ThemeSwitcher from '~/components/ThemeSwitcher';

const Content = styled.header`
  margin: 16px 0 40px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 760px) {
    margin: 40px 0 40px 0;
  }
`;

const Name = styled.h1`
  font-size: 15vw;
  color: ${({ theme }) => theme.titleColor};
  font-weight: 700;
  text-transform: lowercase;
  margin: 0;

  @media (min-width: 760px) {
    font-size: 100px;
  }
`;

const LastName = styled.span`
  color: ${({ theme }) => theme.accentColor};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;

  :focus {
    outline: none;
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface HeaderProps {
  author: string;
}

export default function Header(props: HeaderProps): React.ReactElement {
  const [name, lastname] = props.author.split(' ');

  return (
    <Container>
      <Content>
        <StyledLink to="/">
          <Name>
            {name}
            {lastname && <LastName data-testid="header-lastname">{lastname[0]}.</LastName>}
          </Name>
        </StyledLink>
        <Options>
          <ThemeSwitcher />
        </Options>
      </Content>
    </Container>
  );
}
