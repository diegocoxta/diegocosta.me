import styled from 'styled-components';

export default styled.article`
  margin: 0 0 60px 0;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
`;

export const Content = styled.section`
  line-height: 1.5;

  a {
    color: ${({ theme }) => theme.accentColor};
    text-decoration: none;
    border-bottom: 1px solid ${({ theme }) => theme.backgroundColor};

    :hover,
    :focus {
      border-bottom: 1px solid ${({ theme }) => theme.accentColor};
      outline: none;
    }
  }

  blockquote {
    border-left: 5px solid ${({ theme }) => theme.accentColor};
    padding-left: 20px;
  }

  .gatsby-highlight {
    padding: 10px 0;
  }

  pre[class*='language-'],
  code[class*='language-'],
  .gatsby-highlight {
    background-color: ${({ theme }) => theme.backgroundColor};
    font-family: monospace;
  }

  .line-numbers-rows,
  .line-numbers-rows span::before {
    border: 0.5px solid ${({ theme }) => theme.backgroundColor};
  }

  img {
    box-shadow: none !important;
  }
`;
