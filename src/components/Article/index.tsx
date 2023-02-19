import React from 'react';
import { graphql } from 'gatsby';

import { ArticleInformationFragment } from '~/../graphql-types';

import Article from './Article';

interface Props {
  article?: ArticleInformationFragment | null;
  showArticleMetaAttributes?: boolean;
  showFullContent?: boolean;
}

export default (props: Props): React.ReactElement => {
  const { showArticleMetaAttributes, showFullContent, article } = props;
  const { frontmatter, fields, html, excerpt } = article ?? {};

  const shoudShowFullContent = frontmatter?.homepage_view_full_article || showFullContent;

  return (
    <Article
      title={frontmatter?.title ?? ''}
      date={frontmatter?.date}
      url={fields?.slug}
      tags={frontmatter?.tags as string[]}
      readingTime={fields?.readingTime?.minutes ?? 0}
      language={fields?.language}
      showArticleMetaAttributes={showArticleMetaAttributes}
      content={shoudShowFullContent ? html : frontmatter?.description || excerpt}
    />
  );
};

export const query = graphql`
  fragment ArticleInformation on MarkdownRemark {
    html
    excerpt
    fields {
      slug
      readingTime {
        minutes
      }
      language
    }
    frontmatter {
      date
      title
      description
      tags
      homepage_view_full_article
      status
    }
  }
`;
