import styled from 'styled-components';

export default styled.article`
  margin: 0 0 60px 0;
  font-weight: 400;
`;

export const Content = styled.section`
  line-height: 1.5;

  a {
    color: #d73738;
    text-decoration: none;
    border-bottom: 1px solid transparent;

    :hover {
      border-bottom: 1px solid #d73738;
    }
  }

  blockquote {
    border-left: 5px solid #d73738;
    padding-left: 20px;
  }

  .gatsby-highlight {
    padding: 10px 0;
  }

  pre[class*='language-'],
  code[class*='language-'],
  .gatsby-highlight {
    background-color: transparent;
  }

  .line-numbers-rows,
  .line-numbers-rows span::before {
    border: 0.5px solid transparent;
  }

  img {
    box-shadow: none !important;
  }
`;
