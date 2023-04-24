import React from 'react';
import styled from 'styled-components';

import { Link } from '~/utils/i18n';
import FixedContainer from '~/components/FixedContainer';
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
    font-size: 110px;
  }
`;

const LastName = styled.span`
  color: ${({ theme }) => theme.accentColor};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  display: flex;
  align-items: center;

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
  const { author } = props;
  const [name, lastname] = author.split(' ');

  return (
    <FixedContainer>
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
    </FixedContainer>
  );
}
