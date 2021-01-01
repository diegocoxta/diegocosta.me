import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { FaChevronLeft } from 'react-icons/fa';

import Navigation from '~/components/Navigation';
import ThemeSwitcher from '~/components/ThemeSwitcher';

const Container = styled.header`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    margin-top: 10px;
    display: none;

    @media (min-width: 760px) {
      display: block;
    }
  }
`;

const Name = styled.span<{ small: boolean }>`
  font-size: ${(props) => (props.small ? '8vw' : '15vw')};
  color: ${({ theme }) => theme.titleColor};
  font-weight: 700;
  text-transform: lowercase;

  @media (min-width: 760px) {
    font-size: ${(props) => (props.small ? '34px' : '80px')};
  }
`;

const LastName = styled.span`
  color: ${({ theme }) => theme.accentColor};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.accentColor};
    outline: none;
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled(FaChevronLeft)`
  color: ${({ theme }) => theme.titleColor};
  font-size: 22px;
  font-weight: bold;
  margin-right: 10px;
`;

interface HeaderProps {
  small: boolean;
  author: string;
}

export default function Header(props: HeaderProps): React.ReactElement {
  const [name, lastname] = props.author.split(' ');

  return (
    <Container>
      <StyledLink to="/">
        {props.small && <BackButton />}
        <Name small={props.small}>
          {name}
          {lastname && <LastName data-testid="header-lastname">{lastname[0]}.</LastName>}
        </Name>
      </StyledLink>
      <Options>
        <Navigation />
        <ThemeSwitcher />
      </Options>
    </Container>
  );
}
