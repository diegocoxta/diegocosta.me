import React from 'react';
import { graphql } from 'gatsby';

import Article from './Article';

interface Props {
  article?: Queries.ArticleInformationFragment | null;
  showContent?: boolean | null;
}

export default (props: Props): React.ReactElement => {
  const { article, showContent } = props;
  const { frontmatter, fields, html, excerpt } = article ?? {};

  return (
    <Article
      kind={fields?.collection}
      title={frontmatter?.title ?? ''}
      date={frontmatter?.date}
      url={fields?.slug}
      tags={frontmatter?.tags as string[]}
      readingTime={fields?.readingTime?.minutes ?? 0}
      language={fields?.language}
      content={showContent ? html : frontmatter?.description || excerpt}
    />
  );
};

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
      homepage_view_full_article
      status
    }
  }
`;
