import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import kebabCase from 'lodash.kebabcase';

import translations from './translations';

const Container = styled.header`
  margin: 20px 0 0 0;
`;

const Title = styled.h3`
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 36px;
  margin: 0;
`;

const CustomLink = styled(Link)`
  color: ${({ theme }) => theme.titleColor};
  box-shadow: none;
  text-decoration: none;

  :hover,
  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.titleColor};
    outline: none;
  }
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

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0;
  padding: 0;
`;

const TagItem = styled.li`
  list-style: none;
  padding: 0 10px 0 0;
  margin-bottom: 5px;
`;

const Details = styled.p`
  color: ${({ theme }) => theme.subtitleColor};
  font-size: 18px;
  margin: 5px 0;
`;

export interface ArticleHeaderProps {
  url?: string | null;
  title: string;
  readingTime: number;
  lang?: string | null;
  date: string;
  tags?: string[] | null;
}

export default function ArticleHeader(props: ArticleHeaderProps): React.ReactElement {
  const texts = translations[props.lang ?? 'en'];
  const readingTime = props.readingTime < 1 ? texts.lessThan1Minute : `${props.readingTime.toFixed()} ${texts.minutes}`;

  const Tags = props.tags && (
    <TagList data-testid="article-header-tags">
      {props.tags.map((tag: string, index: number) => (
        <TagItem key={`${index}-${tag}`} data-testid="article-header-tag">
          <TagLink to={`/tags/${kebabCase(tag ?? '')}`}>#{kebabCase(tag ?? '')}</TagLink>
        </TagItem>
      ))}
    </TagList>
  );

  const linkWithLanguage = (url: string) => `/${props.lang ? props.lang : ''}${url}`;

  return (
    <Container>
      <Title>
        {props.url ? (
          <CustomLink to={linkWithLanguage(props.url)} data-testid="article-header-custom-link">
            {props.title}
          </CustomLink>
        ) : (
          props.title
        )}
      </Title>
      <Details>
        <span>
          {props.date} · {readingTime} {texts.ofReading}
        </span>
      </Details>
      {Tags}
    </Container>
  );
}
