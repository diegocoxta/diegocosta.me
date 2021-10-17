import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  max-width: 800px;
  margin: 16px;

  @media (min-width: 760px) {
    margin: 16px auto;
  }
`;

export interface ContainerProps {
  children: React.ReactNode;
}

export default function Container(props: ContainerProps): React.ReactElement {
  return (
    <Wrapper>
      <main>{props.children}</main>
    </Wrapper>
  );
}
