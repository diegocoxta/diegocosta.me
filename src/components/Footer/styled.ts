import styled from 'styled-components';

export const Container = styled.footer``;

export const Label = styled.span`
  color: #fff;
`;

export const Link = styled.a.attrs({
  target: '_blank',
})`
  color: #d73738;
  text-decoration: none;
  box-shadow: none;

  :hover {
    border-bottom: 1px solid #d73738;
  }
`;

export const Navigation = styled.nav`
  max-width: 400px;
  margin-bottom: 50px;
`;

export const NavigationList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-between;
`;

export const NavigationItem = styled.li`
  list-style: none;
  font-size: 18px;
  font-weight: 700;
`;

export const NavigationLink = styled(Link)`
  text-decoration: none;
  color: #d73738;
  display: block;
  padding: 0;
  border-bottom: 1px solid transparent;

  :hover {
    border-bottom: 1px solid #d73738;
  }
`;
