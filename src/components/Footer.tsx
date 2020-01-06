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

function Footer () {
  const currentYear = new Date().getFullYear();

  return (
    <Copyright>
      {`© ${currentYear}, Built with `}
      <Link href="https://www.gatsbyjs.org">Gatsby</Link>
    </Copyright>
  );
}
  
export default Footer;