import React from 'react';
import styled, { keyframes } from 'styled-components';

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

const avatarAnimation = keyframes`
  0%, 100% { border-radius: 63% 37% 54% 46%/55% 48% 52% 45% }

  14% { border-radius: 40% 60% 54% 46%/49% 60% 40% 51% }

  28% { border-radius: 54% 46% 38% 62%/49% 70% 30% 51% }

  42% { border-radius: 61% 39% 55% 45%/61% 38% 62% 39% }

  56% { border-radius: 61% 39% 67% 33%/70% 50% 50% 30% }

  70% { border-radius: 50% 50% 34% 66%/56% 68% 32% 44% }

  84% { border-radius: 46% 54% 50% 50%/35% 61% 39% 65% }
`;

const Avatar = styled.img`
  animation: ${avatarAnimation} 10s linear infinite alternate forwards;
  width: 15vw;
  margin-right: 30px;
  height: 100%;

  @media (min-width: 760px) {
    width: 90px;
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
  avatar?: string;
}

export default function Header(props: HeaderProps): React.ReactElement {
  const { avatar, author } = props;
  const [name, lastname] = author.split(' ');

  return (
    <FixedContainer>
      <Content>
        <StyledLink to="/">
          {avatar && <Avatar src={avatar} />}
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
