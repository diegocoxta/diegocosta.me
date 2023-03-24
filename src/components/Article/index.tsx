import React from 'react';
import { graphql } from 'gatsby';

import { ArticleInformationFragment } from '~/../graphql-types';

import Article from './Article';

interface Props {
  article?: ArticleInformationFragment | null;
  showMetaAttributes?: boolean;
  showBodyContent?: boolean;
}

export default (props: Props): React.ReactElement => {
  const { showMetaAttributes, showBodyContent, article } = props;
  const { frontmatter, fields, html, excerpt } = article ?? {};

  return (
    <Article
      title={frontmatter?.title ?? ''}
      date={frontmatter?.date}
      url={fields?.slug}
      tags={frontmatter?.tags as string[]}
      readingTime={fields?.readingTime?.minutes ?? 0}
      language={frontmatter?.language}
      showMetaAttributes={showMetaAttributes}
      content={showBodyContent ? html : frontmatter?.description || excerpt}
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
    }
    frontmatter {
      date
      title
      description
      tags
      homepage_view_full_article
      status
      language
    }
  }
`;
