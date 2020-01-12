import React from 'react';
import styled from 'styled-components';

const Copyright = styled.footer`
  color: #fff;
`;

const Link = styled.a`
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

const NavigationLink = styled.a.attrs({
  target: '_blank',
})`
  text-decoration: none;
  color: #d73738;
  display: block;
  padding: 0;
  border-bottom: 1px solid transparent;

  :hover {
    border-bottom: 1px solid #d73738;
  }
`;

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Copyright>
      <Navigation>
        <NavigationList>
          <NavigationItem>
            <NavigationLink href="https://diegocosta.com.br">sobre mim</NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink href="https://github.com/diegocosta">github</NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink href="https://linkedin.com/in/diegoscosta">linkedin</NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink href="https://twitter.com/diegocoxta">twitter</NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink href="diego@diegocosta.com.br">e-mail</NavigationLink>
          </NavigationItem>
        </NavigationList>
      </Navigation>
      {`© ${currentYear}, Built with `}
      <Link href="https://www.gatsbyjs.org">Gatsby</Link>
    </Copyright>
  );
}

export default Footer;
