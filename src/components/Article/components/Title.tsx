import React from 'react';
import styled from 'styled-components';

import { Link } from '~/utils/i18n';

const Container = styled(Link).attrs((props) => ({
  as: props.to ? Link : 'h2',
}))`
  color: ${({ theme }) => theme.titleColor};
  box-shadow: none;
  text-decoration: none;
  font-size: 36px;
  margin: 0;
  font-weight: bold;

  :hover,
  :focus {
    border-bottom: ${({ theme, to }) => to && `1px solid ${theme.titleColor}`};
    outline: none;
  }
`;

const Label = styled.span`
  background: ${({ theme }) => theme.accentColor};
  padding: 2px 10px;
  margin: 0px 10px 0 0;
  color: #ffffff;
  border-radius: 5px;
`;

export interface TitleProps {
  title: string;
  url?: string | null;
  label?: string | null;
}

export default function Title(props: TitleProps) {
  return (
    <Container to={props.url} data-testid="article-header-title">
      {props.label && <Label data-testid="article-header-label">{props.label}</Label>}
      {props.title}
    </Container>
  );
}
