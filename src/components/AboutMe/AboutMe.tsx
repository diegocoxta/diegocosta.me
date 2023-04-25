import React from 'react';
import styled from 'styled-components';

import FixedContainer from '~/components/FixedContainer';

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

interface AboutMeProps {
  description: string;
  navigation?: [
    {
      label: string;
      url: string;
      rel?: string;
    }
  ];
}

export default function AboutMe(props: AboutMeProps): JSX.Element {
  return (
    <FixedContainer>
      {props.description.split('\n').map((p) => (
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
    </FixedContainer>
  );
}
