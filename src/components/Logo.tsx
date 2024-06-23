import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

export interface LogoProps {
  name: string;
  to?: string;
  size?: 'small' | 'large';
}

const Container = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  display: flex;
  align-items: center;

  &:focus {
    outline: none;
  }
`;

const Name = styled.h1<{ size: LogoProps['size'] }>`
  font-size: ${(props) => (props.size === 'large' ? '15vw' : '6vw')};
  color: ${({ theme }) => theme.titleColor};
  font-weight: 700;
  text-transform: lowercase;
  margin: 0;

  @media (min-width: 760px) {
    font-size: ${(props) => (props.size === 'large' ? '110px' : '40px')};
  }
`;

const LastName = styled.span`
  color: ${({ theme }) => theme.accentColor};
`;

export default function Logo({ size = 'large', to = '/', ...props }: LogoProps) {
  const [name, lastname] = props.name.split(' ');

  return (
    <Container to={to} data-testid="logo-link">
      <Name size={size}>
        {name}
        {lastname && <LastName data-testid="logo-lastname">{lastname[0]}.</LastName>}
      </Name>
    </Container>
  );
}
