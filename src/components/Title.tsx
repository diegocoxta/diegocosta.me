import styled from 'styled-components';
import { Link } from 'gatsby';

export default styled(Link).attrs((props) => ({
  as: props.to ? Link : 'h2',
  'data-testid': 'title',
}))`
  color: ${({ theme }) => theme.titleColor};
  box-shadow: none;
  text-decoration: none;
  font-size: 36px;
  margin: 0;
  font-weight: 700;

  &:hover,
  &:focus {
    border-bottom: ${({ theme, to }) => to && `1px solid ${theme.titleColor}`};
    outline: none;
  }
`;
