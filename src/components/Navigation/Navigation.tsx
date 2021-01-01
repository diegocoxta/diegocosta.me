import React from 'react';
import styled from 'styled-components';

const Container = styled.nav`
  @media (min-width: 750px) {
    width: 400px;
  }
`;

const List = styled.ul`
  margin: 0;
  display: flex;
  padding: 0;
  justify-content: space-between;
`;

const Item = styled.li`
  list-style: none;
  font-size: 16px;
  font-weight: 700;

  @media (min-width: 760px) {
    font-size: 18px;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: #d73738;
  display: block;
  padding: 0;
  border-bottom: 1px solid transparent;

  :hover {
    border-bottom: 1px solid #d73738;
  }
`;

interface NavigationProps {
  list: [
    {
      link: string;
      label: string;
    }
  ];
}

export default function Navigation(props: NavigationProps): React.ReactElement {
  return (
    <Container>
      <List>
        {props.list &&
          props.list.map((item, index) => (
            <Item key={index}>
              <Link href={item.link} target="_blank" rel="noopener">
                {item.label}
              </Link>
            </Item>
          ))}
      </List>
    </Container>
  );
}
