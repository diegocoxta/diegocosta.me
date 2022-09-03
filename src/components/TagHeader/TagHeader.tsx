import React from 'react';
import styled from 'styled-components';

import FixedContainer from '~/components/FixedContainer';

const Content = styled.h1`
  font-size: 28px;
  border-bottom: 5px solid ${({ theme }) => theme.accentColor};
  padding: 5px;
  margin: 40px 0 20px 0;
  display: flex;
  justify-content: space-between;
`;

interface TagHeaderProps {
  name: string;
}

export default function TagHeader(props: TagHeaderProps): React.ReactElement {
  return (
    <FixedContainer>
      <Content>{props.name}</Content>
    </FixedContainer>
  );
}
