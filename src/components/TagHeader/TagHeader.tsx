import React from 'react';
import styled from 'styled-components';

import Container from '~/components/Container';

const Content = styled.h1`
  font-size: 28px;
  background: ${({ theme }) => theme.accentColor};
  display: inline-block;
  padding: 5px;
  margin: 40px 0 20px 0;
`;

interface TagHeaderProps {
  name: string;
  count: number;
}

export default function TagHeader(props: TagHeaderProps): React.ReactElement {
  return (
    <Container>
      <Content>
        {props.name} ({props.count})
      </Content>
    </Container>
  );
}
