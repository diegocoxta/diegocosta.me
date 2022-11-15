import React from 'react';
import styled from 'styled-components';

import FixedContainer from '~/components/FixedContainer';

const Content = styled.h1`
  display: inline-block;
  background: ${({ theme }) => theme.accentColor};
  padding: 2px 10px;
  margin: 0px 10px 30px 0;
  color: #fff;
  border-radius: 5px;
  font-size: 48px;
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
