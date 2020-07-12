import React from 'react';

import Container, { ContainerProps } from './Container';

export default (props: ContainerProps): React.ReactElement => {
  return <Container small={props.small}>{props.children}</Container>;
};
