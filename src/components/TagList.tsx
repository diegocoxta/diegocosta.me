import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  list-style: none;
  padding: 0 10px 0 0;
`;

const Tag = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  font-size: 16px;
  color: ${({ theme }) => theme.accentColor};
  font-weight: 700;
  text-transform: lowercase;

  &:hover,
  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.accentColor};
    outline: none;
  }
`;

export interface TagListProps {
  tags?: string[] | null;
}

export default function TagList(props: TagListProps) {
  return (
    <List data-testid="taglist-list">
      {props.tags?.map((tag: string, index: number) => (
        <Item key={`${index}-${tag}`} data-testid="taglist-item">
          <Tag to={`/tags/${tag}`}>{`#${tag}`}</Tag>
        </Item>
      ))}
    </List>
  );
}
