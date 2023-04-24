import React from 'react';
import styled from 'styled-components';

import FixedContainer from '~/components/FixedContainer';

const Content = styled.div`
  p {
    font-size: 24px;
    line-height: 1.4;
    color: ${({ theme }) => theme.textColor};
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
    font-size: 24px;
    font-weight: 700;
    margin: 0 24px 5px 0;

    @media (min-width: 760px) {
      font-size: 22px;
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
        line-height: 0.5;

        @media (min-width: 760px) {
          line-height: 0.4;
        }
      }

      :hover:after {
        color: ${({ theme }) => theme.textColor};
      }
    }
  }
`;

interface AboutMeProps {
  content: string;
}

export default function AboutMe(props: AboutMeProps): JSX.Element {
  return (
    <FixedContainer>
      <Content dangerouslySetInnerHTML={{ __html: props.content }} />
    </FixedContainer>
  );
}
