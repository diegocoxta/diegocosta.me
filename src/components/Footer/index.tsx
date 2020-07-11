import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { Container, Navigation, NavigationLink, NavigationItem, NavigationList, Link, Label } from './styled';

interface FooterProps {
  year: number;
  contacts: [
    {
      link: string;
      label: string;
    }
  ];
  repository?: string;
}

export function Footer(props: FooterProps) {
  return (
    <Container>
      <Navigation>
        <NavigationList>
          {props.contacts &&
            props.contacts.map((item, index) => (
              <NavigationItem key={index}>
                <NavigationLink href={item.link}>{item.label}</NavigationLink>
              </NavigationItem>
            ))}
        </NavigationList>
      </Navigation>
      <Label>© ${props.year}, built with </Label>
      <Link href="https://gatsbyjs.org">gatsby</Link>
      <Label> • </Label>
      {props.repository && <Link href={props.repository}>source code</Link>}
    </Container>
  );
}

export default () => {
  const {
    site: {
      siteMetadata: { contacts, repository },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            contacts {
              label
              link
            }
            repository
          }
        }
      }
    `
  );

  const year = new Date().getFullYear();

  return <Footer contacts={contacts} repository={repository} year={year} />;
};
