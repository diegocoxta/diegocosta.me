import React from 'react';
import styled from 'styled-components';

import { Link } from '@app/components/LanguageSwitcher';

export interface BrandNameProps {
  author: string;
  href: string;
  size: 'small' | 'large';
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

const Name = styled.h1<{ size: BrandNameProps['size'] }>`
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

export default function BrandName(props: BrandNameProps) {
  const [name, lastname] = props.author.split(' ');

  return (
    <Container to={props.href}>
      <Name size={props.size}>
        {name}
        {lastname && <LastName data-testid="header-lastname">{lastname[0]}.</LastName>}
      </Name>
    </Container>
  );
}

BrandName.defaultProps = {
  size: 'large',
  href: '/',
};
