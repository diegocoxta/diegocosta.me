import React from 'react';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Container from '~/components/Container';

const Content = styled.div`
  @media (min-width: 760px) {
    padding-bottom: 40px;
  }

  p {
    font-size: 18px;
    line-height: 1.4;
    color: ${({ theme }) => theme.textColor};

    @media (min-width: 760px) {
      font-size: 24px;
    }
  }

  ul {
    margin: 0;
    padding: 0;

    @media (min-width: 760px) {
      display: flex;
    }
  }

  li {
    list-style: none;
    font-size: 18px;
    font-weight: 900;
    margin: 0 24px 5px 0;

    @media (min-width: 760px) {
      font-size: 20px;
      margin: 0 24px 0 0;
    }

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.textColor};
      display: flex;
      padding: 0;
      text-transform: uppercase;

      :after {
        content: '.';
        display: block;
        color: ${({ theme }) => theme.backgroundColor};
        font-size: 38px;
        line-height: 0.2;

        @media (min-width: 760px) {
          line-height: 0.3;
        }
      }

      :hover:after {
        color: ${({ theme }) => theme.textColor};
      }
    }
  }
`;

interface AboutMeProps {
  mdxContent: string;
}

export default function AboutMe(props: AboutMeProps): JSX.Element {
  return (
    <Container>
      <Content>
        <MDXRenderer>{props.mdxContent}</MDXRenderer>
      </Content>
    </Container>
  );
}
