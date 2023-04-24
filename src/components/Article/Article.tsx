import React from 'react';
import styled from 'styled-components';

import { usei18n, getContentLanguage } from '~/utils/i18n';

import FixedContainer from '~/components/FixedContainer';

import Title, { TitleProps } from './components/Title';
import Tags, { TagsProps } from './components/Tags';

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

export type ArticleProps = TitleProps &
  TagsProps & {
    readingTime?: number;
    language?: string | null;
    date?: string;
    content?: string | null;
    showMetaAttributes?: boolean;
  };

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
    <FixedContainer>
      <Container data-testid="article-item">
        <Header>
          <Title title={props.title} url={props.url} />
          {props.showMetaAttributes && (
            <>
              <MetaAttributes>
                {date} {getReadingTime()} · {getContentLanguage(i18n, props.language)}
              </MetaAttributes>
              <Tags tags={props.tags} />
            </>
          )}
        </Header>
        {props.content && <Content dangerouslySetInnerHTML={{ __html: props.content }} />}
      </Container>
    </FixedContainer>
  );
}

Article.defaultProps = {
  showMetaAttributes: true,
};
