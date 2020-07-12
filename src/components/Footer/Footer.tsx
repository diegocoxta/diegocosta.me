import React from 'react';
import styled from 'styled-components';

const Container = styled.footer``;

const Label = styled.span`
  color: #fff;
`;

const Link = styled.a.attrs({
  target: '_blank',
})`
  color: #d73738;
  text-decoration: none;
  box-shadow: none;

  :hover {
    border-bottom: 1px solid #d73738;
  }
`;

const Navigation = styled.nav`
  max-width: 400px;
  margin-bottom: 50px;
`;

const NavigationList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-between;
`;

const NavigationItem = styled.li`
  list-style: none;
  font-size: 18px;
  font-weight: 700;
`;

const NavigationLink = styled(Link)`
  text-decoration: none;
  color: #d73738;
  display: block;
  padding: 0;
  border-bottom: 1px solid transparent;

  :hover {
    border-bottom: 1px solid #d73738;
  }
`;

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

export default function Footer(props: FooterProps): React.ReactElement {
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
