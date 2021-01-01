import styled from 'styled-components';

export default styled.h1`
  font-size: 22px;
  background: ${({ theme }) => theme.accentColor};
  display: inline;
  padding: 5px;
`;
