import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Container = styled.header`
  margin-bottom: 20px;
`;

const Name = styled.span`
  font-size: 15vw;
  color: #fff;
  font-weight: 700;

  @media (min-width: 760px) {
    font-size: 80px;
  }
`;

const LastName = styled.span`
  color: #d73738;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;
`;

function Header() {
  return (
    <Container>
      <StyledLink to={`/`}>
        <Name>diego<LastName>c.</LastName></Name>
      </StyledLink>
    </Container>
  );
}

Header.defaultProps = {
  small: false,
};

export default Header;