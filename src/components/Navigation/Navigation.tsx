import React from 'react';
import styled from 'styled-components';

const Container = styled.nav``;

const List = styled.ul`
  margin: 0;
  padding: 0;

  @media (min-width: 760px) {
    display: flex;
  }
`;

const Item = styled.li`
  list-style: none;
  font-size: 18px;
  font-weight: 900;
  margin: 0 24px 5px 0;

  @media (min-width: 760px) {
    font-size: 20px;
    margin: 0 24px 0 0;
  }
`;

const Link = styled.a`
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
    line-height: 0.2;

    @media (min-width: 760px) {
      line-height: 0.3;
    }
  }

  :hover:after {
    color: ${({ theme }) => theme.textColor};
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
