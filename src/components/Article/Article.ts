import styled from 'styled-components';

export default styled.article`
  margin: 0 0 60px 0;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
`;

export const Content = styled.section`
  line-height: 1.5;

  table {
    width: 100%;
  }

  a {
    color: ${({ theme }) => theme.accentColor};
    text-decoration: none;
    border-bottom: 1px solid #0b0c0d;

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
    background-color: #0b0c0d;
  }

  .line-numbers-rows,
  .line-numbers-rows span::before {
    border: 0.5px solid #0b0c0d;
  }

  img {
    box-shadow: none !important;
  }
`;
