import React from 'react';
import styled from 'styled-components';
import kebabCase from 'lodash.kebabcase';

import { Link } from '~/utils/i18n';

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
`;

const TagItem = styled.li`
  list-style: none;
  padding: 10px 10px 0 0;
  margin-bottom: 5px;
`;

const TagLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  font-size: 14px;
  color: ${({ theme }) => theme.accentColor};
  font-weight: 700;
  text-transform: lowercase;

  :hover,
  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.accentColor};
    outline: none;
  }
`;

export interface TagsProps {
  tags?: string[] | null;
}

export default function Tags(props: TagsProps) {
  return (
    <TagList data-testid="article-header-tags">
      {props.tags?.map((tag: string, index: number) => (
        <TagItem key={`${index}-${tag}`} data-testid="article-header-tag">
          <TagLink to={`/tags/${kebabCase(tag ?? '')}`}>#{kebabCase(tag ?? '')}</TagLink>
        </TagItem>
      ))}
    </TagList>
  );
}
