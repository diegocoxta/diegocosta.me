import React from 'react';
import styled from 'styled-components';

import ThemeSwitcher from '~/components/ThemeSwitcher';
import LanguageSwitcher from '~/components/LanguageSwitcher';
import Commander from '~/components/Commander';

import { Link, useLocale } from '~/hooks/useLocale';

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

const Paragraph = styled.p`
  font-size: 24px;
  line-height: 1.4;
  color: ${({ theme }) => theme.textColor};
`;

const Navigation = styled.ul`
  margin: 0;
  padding: 0;

  @media (min-width: 760px) {
    display: flex;
  }
`;

const NavigationItem = styled.li`
  list-style: none;
  font-size: 24px;
  font-weight: 700;
  margin: 0 24px 5px 0;

  @media (min-width: 760px) {
    font-size: 22px;
    margin: 0 24px 0 0;
  }
`;

const NavigationLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  padding: 0;
  text-transform: uppercase;

  :after {
    content: '.';
    display: block;
    color: ${({ theme }) => theme.backgroundColor};
    font-size: 38px;
    line-height: 0.5;

    @media (min-width: 760px) {
      line-height: 0.4;
    }
  }

  :hover:after {
    color: ${({ theme }) => theme.textColor};
  }
`;

interface HeaderProps {
  author: string;
  description?: { [key: string]: string };
  navigation?: [
    {
      label: string;
      url: string;
      rel?: string;
    }
  ];
}

export default function Header(props: HeaderProps): React.ReactElement {
  const locale = useLocale();
  const currentLanguage = locale.getCurrentLanguage();

  const [name, lastname] = props.author.split(' ');
  const description = props.description && props.description[currentLanguage];

  return (
    <>
      <LanguageSwitcher />
      <Content>
        <StyledLink to="/">
          <Name>
            {name}
            {lastname && <LastName data-testid="header-lastname">{lastname[0]}.</LastName>}
          </Name>
        </StyledLink>
        <Options>
          <ThemeSwitcher />
          <Commander />
        </Options>
      </Content>
      {description?.split('\n').map((p: string) => (
        <Paragraph key={p} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
      {props.navigation && (
        <Navigation data-testid="about-me-navigation-list">
          {props.navigation.map((nav, index) => (
            <NavigationItem key={`nav-${index}`} data-testid="about-me-navigation-item">
              <NavigationLink href={nav.url} rel={nav.rel}>
                {nav.label}
              </NavigationLink>
            </NavigationItem>
          ))}
        </Navigation>
      )}
    </>
  );
}
