import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Title from './Title';
import TagList from './TagList';
import BodyPost from './BodyPost';

const Container = styled.article`
  margin: 20px 0 60px 0;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
`;

const MetaAttributes = styled.p`
  color: ${({ theme }) => theme.subtitleColor};
  font-size: 19px;
  margin: 10px 0;
`;

type Nullable<T> = T | null;

export type ArticleProps = {
  readingTime?: number;
  date?: Nullable<string>;
  language?: Nullable<string>;
  content?: Nullable<string>;
  kind?: Nullable<string>;
  tags?: string[] | null;
  title: string;
  url?: string | null;
  showContent?: boolean | null;
};

export default function Article(props: ArticleProps): React.ReactElement {
  const getReadingTime = () => {
    if (!props.readingTime) {
      return undefined;
    }

    if (props.readingTime < 1) {
      return `· Less than 1 minute of reading`;
    }

    return `· ${props.readingTime?.toFixed()} minutes of reading`;
  };

  const date =
    props.date &&
    new Date(props.date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

  return (
    <Container data-testid="article-item">
      <Title to={props.url ?? ''}>{props.title}</Title>
      {props.kind === 'articles' && (
        <>
          <MetaAttributes>
            {date} {getReadingTime()} · In {props.language}
          </MetaAttributes>
          <TagList tags={props.tags} />
        </>
      )}
      {props.content && <BodyPost html={props.content} />}
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
      language
    }
  }
`;
