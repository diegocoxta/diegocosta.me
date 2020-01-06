import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

interface HeaderProps {
  small?: boolean;
}

const Container = styled.header`
  margin-bottom: 20px;
`;

const Name = styled.span<HeaderProps>`
  font-size: ${props => props.small ? '6vw' : '15vw'};
  color: #fff;
  font-weight: 700;

  @media (min-width: 760px) {
    font-size: ${props => props.small ? '24px' : '80px'};
  }
`;

const LastName = styled.span`
  color: #d73738;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;
`;

function Header(props: HeaderProps) {
  return (
    <Container>
      <StyledLink to={`/`}>
        <Name small={props.small}>diego<LastName>c.</LastName></Name>
      </StyledLink>
    </Container>
  );
}

Header.defaultProps = {
  small: false,
};

export default Header;