import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { useLocale, getContentLanguage, Link } from '@app/components/LanguageSwitcher';

const Container = styled.article`
  margin: 0 0 60px 0;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
`;

const Header = styled.header`
  margin: 20px 0 0 0;
`;

const MetaAttributes = styled.p`
  color: ${({ theme }) => theme.subtitleColor};
  font-size: 19px;
  margin: 10px 0;
`;

export const Content = styled.section`
  line-height: 1.5;
  font-size: 19px;
  margin-top: 10px;

  a {
    color: ${({ theme }) => theme.accentColor};
    text-decoration: none;
    border-bottom: 1px solid ${({ theme }) => theme.backgroundColor};

    &:hover,
    &:focus {
      border-bottom: 1px solid ${({ theme }) => theme.accentColor};
      outline: none;
    }
  }

  code {
    background: ${({ theme }) => theme.accentColor}40;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 16px;
  }

  blockquote {
    border-left: 5px solid ${({ theme }) => theme.accentColor};
    padding-left: 20px;
    margin-left: 0;
  }

  img {
    box-shadow: none !important;
  }

  h3 {
    font-size: 28px;
  }

  table.uses-table {
    width: 100%;
    margin: 40px 0;

    td {
      text-align: center;
    }
  }
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
`;

const TagItem = styled.li`
  list-style: none;
  padding: 0 10px 0 0;
`;

const TagLink = styled(Link)`
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

const Title = styled(Link).attrs((props) => ({
  as: props.to ? Link : 'h2',
}))`
  color: ${({ theme }) => theme.titleColor};
  box-shadow: none;
  text-decoration: none;
  font-size: 36px;
  margin: 0;
  font-weight: 700;

  &:hover,
  &:focus {
    border-bottom: ${({ theme, to }) => to && `1px solid ${theme.titleColor}`};
    outline: none;
  }
`;

type Nullable<T> = T | null;

export type ArticleProps = {
  readingTime?: number;
  language?: Nullable<string>;
  date?: Nullable<string>;
  content?: Nullable<string>;
  kind?: Nullable<string>;
  tags?: string[] | null;
  title: string;
  url?: string | null;
  showContent?: boolean | null;
};

export default function Article(props: ArticleProps): React.ReactElement {
  const locale = useLocale();

  const pageLanguage = locale.getCurrentLanguage();

  const getReadingTime = () => {
    if (!props.readingTime) {
      return undefined;
    }

    const lessThan1Minute = locale.getTranslationFor('article.lessThan1Minute');
    const ofReading = locale.getTranslationFor('article.ofReading');
    const minutes = locale.getTranslationFor('article.minutes');

    if (props.readingTime < 1) {
      return `· ${lessThan1Minute} ${ofReading}`;
    }

    return `· ${props.readingTime?.toFixed()} ${minutes} ${ofReading}`;
  };

  const date =
    props.date &&
    new Date(props.date).toLocaleDateString(pageLanguage, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

  return (
    <Container data-testid="article-item">
      <Header>
        <Title to={props.url} data-testid="article-header-title" language={props.url ? props.language : undefined}>
          {props.title}
        </Title>
        {props.kind === 'articles' && (
          <>
            <MetaAttributes>
              {date} {getReadingTime()} · {getContentLanguage(locale, props.language)}
            </MetaAttributes>
            <TagList data-testid="article-header-tags">
              {props.tags?.map((tag: string, index: number) => (
                <TagItem key={`${index}-${tag}`} data-testid="article-header-tag">
                  <TagLink to={`/tags/${tag}`}>{`#${tag}`}</TagLink>
                </TagItem>
              ))}
            </TagList>
          </>
        )}
      </Header>
      {props.content && <Content dangerouslySetInnerHTML={{ __html: props.content }} />}
    </Container>
  );
}

export const query = graphql`
  fragment ArticleInformation on MarkdownRemark {
    html
    excerpt
    fields {
      collection
      slug
      language
      readingTime {
        minutes
      }
    }
    frontmatter {
      date
      title
      description
      tags
      flags
    }
  }
`;
