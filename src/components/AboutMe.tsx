import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Paragraph = styled.p`
  font-size: 24px;
  line-height: 1.4;
  color: ${({ theme }) => theme.textColor};
`;

const Links = styled.ul`
  margin: 0;
  padding: 0;

  @media (min-width: 760px) {
    display: flex;
  }
`;

const LinksItem = styled.li`
  list-style: none;
  font-size: 24px;
  font-weight: 700;
  margin: 0 24px 5px 0;

  @media (min-width: 760px) {
    font-size: 22px;
    margin: 0 24px 0 0;
  }
`;

const LinksLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  padding: 0;
  text-transform: uppercase;

  &:after {
    content: '.';
    display: block;
    color: ${({ theme }) => theme.backgroundColor};
    font-size: 38px;
    line-height: 0.5;

    @media (min-width: 760px) {
      line-height: 0.4;
    }
  }

  &:hover:after {
    color: ${({ theme }) => theme.textColor};
  }
`;

export interface AboutMeProps {
  bio?: string;
  socialLinks?: [
    {
      label: string;
      url: string;
      rel?: string;
    },
  ];
}

export default function AboutMe(props: AboutMeProps) {
  return (
    <Container>
      {props.bio
        ?.split('\n')
        .map((p: string) => <Paragraph data-testid="about-me-bio" key={p} dangerouslySetInnerHTML={{ __html: p }} />)}
      {props.socialLinks && (
        <Links data-testid="about-me-sociallinks">
          {props.socialLinks.map((nav, index) => (
            <LinksItem key={`nav-${index}`} data-testid="about-me-sociallinks-item">
              <LinksLink href={nav.url} rel={nav.rel} target="_blank">
                {nav.label}
              </LinksLink>
            </LinksItem>
          ))}
        </Links>
      )}
    </Container>
  );
}
