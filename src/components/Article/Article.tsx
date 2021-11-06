import React from 'react';
import styled from 'styled-components';
import kebabCase from 'lodash.kebabcase';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { usei18n, Link } from '~/utils/i18n';

import FixedContainer from '~/components/FixedContainer';

const Content = styled.article`
  margin: 0 0 60px 0;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
`;

const Header = styled.header`
  margin: 20px 0 0 0;
`;

const Title = styled.h2`
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

export const Body = styled.section`
  line-height: 1.5;

  a {
    color: ${({ theme }) => theme.accentColor};
    text-decoration: none;
    border-bottom: 1px solid ${({ theme }) => theme.backgroundColor};

    :hover,
    :focus {
      border-bottom: 1px solid ${({ theme }) => theme.accentColor};
      outline: none;
    }
  }

  blockquote {
    border-left: 5px solid ${({ theme }) => theme.accentColor};
    padding-left: 20px;
  }

  .gatsby-highlight {
    padding: 10px 0;
  }

  pre[class*='language-'],
  code[class*='language-'],
  .gatsby-highlight {
    background-color: ${({ theme }) => theme.backgroundColor};
    font-family: monospace;
    white-space: pre-wrap;
  }

  .line-numbers-rows,
  .line-numbers-rows span::before {
    border: 0.5px solid ${({ theme }) => theme.backgroundColor};
  }

  img {
    box-shadow: none !important;
  }

  h3 {
    font-size: 28px;
  }
`;

export interface ArticleProps {
  title: string;
  url?: string | null;
  readingTime?: number;
  language?: string | null;
  date?: string;
  tags?: string[] | null;
  description?: string | null;
  mdxContent?: string | null;
  showArticleDetails?: boolean;
}

export default function Article(props: ArticleProps): React.ReactElement {
  const i18n = usei18n();

  const pageLanguage = i18n.getCurrentLanguage();

  const getReadingTime = () => {
    if (!props.readingTime) {
      return undefined;
    }

    const lessThan1Minute = i18n.getTranslationFor('article.lessThan1Minute');
    const ofReading = i18n.getTranslationFor('article.ofReading');
    const minutes = i18n.getTranslationFor('article.minutes');

    if (props.readingTime < 1) {
      return ` · ${lessThan1Minute} ${ofReading}`;
    }

    return ` · ${props.readingTime?.toFixed()} ${minutes} ${ofReading}`;
  };

  const date =
    props.date &&
    new Date(props.date).toLocaleDateString(pageLanguage, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

  const language = () => {
    if (!props.language) {
      return;
    }

    const languagePrefix = i18n.getTranslationFor('article.languagePrefix');
    const languageName = i18n.getTranslationFor(`languages.${props.language}`);

    return ` · ${languagePrefix} ${languageName}`;
  };

  const Tags = props.showArticleDetails && props.tags && (
    <TagList data-testid="article-header-tags">
      {props.tags.map((tag: string, index: number) => (
        <TagItem key={`${index}-${tag}`} data-testid="article-header-tag">
          <TagLink to={`/tags/${kebabCase(tag ?? '')}`}>#{kebabCase(tag ?? '')}</TagLink>
        </TagItem>
      ))}
    </TagList>
  );

  return (
    <FixedContainer>
      <Content data-testid="article-item">
        <Header>
          <Title>
            {props.url ? (
              <CustomLink to={props.url} data-testid="article-header-custom-link" language={props.language}>
                {props.title}
              </CustomLink>
            ) : (
              props.title
            )}
          </Title>
          {props.showArticleDetails && (
            <Details>
              {date} {getReadingTime()} {language()}
            </Details>
          )}
          {Tags}
        </Header>
        {props.description && <Body dangerouslySetInnerHTML={{ __html: props.description }} />}
        {props.mdxContent && (
          <Body>
            <MDXRenderer>{props.mdxContent}</MDXRenderer>
          </Body>
        )}
      </Content>
    </FixedContainer>
  );
}

Article.defaultProps = {
  showArticleDetails: true,
};
