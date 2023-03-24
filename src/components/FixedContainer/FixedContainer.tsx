import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
`;

export interface FixedContainerProps {
  children: React.ReactNode;
}

export default function FixedContainer(props: FixedContainerProps): React.ReactElement {
  return (
    <Wrapper>
      <main>{props.children}</main>
    </Wrapper>
  );
}
