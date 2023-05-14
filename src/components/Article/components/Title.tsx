import React from 'react';
import styled from 'styled-components';

import { Link } from '~/hooks/useLocale';

const Container = styled(Link).attrs((props) => ({
  as: props.to ? Link : 'h2',
}))`
  color: ${({ theme }) => theme.titleColor};
  box-shadow: none;
  text-decoration: none;
  font-size: 36px;
  margin: 0;
  font-weight: 700;

  :hover,
  :focus {
    border-bottom: ${({ theme, to }) => to && `1px solid ${theme.titleColor}`};
    outline: none;
  }
`;

export interface TitleProps {
  title: string;
  url?: string | null;
  language?: string | null;
}

export default function Title(props: TitleProps) {
  return (
    <Container to={props.url} data-testid="article-header-title" language={props.language}>
      {props.title}
    </Container>
  );
}
