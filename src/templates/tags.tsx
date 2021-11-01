import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';
import TagHeader from '~/components/TagHeader';

import { TagsTemplateQuery, TagsTemplateQueryVariables } from '~/../graphql-types';

interface TagsTemplateProps extends PageRendererProps {
  pageContext: TagsTemplateQueryVariables;
  data: TagsTemplateQuery;
}

export default function Tags({ data, pageContext }: TagsTemplateProps): React.ReactElement {
  const { articles } = data;
  return (
    <Page>
      <Metatags title={`Publicações sobre ${pageContext.tag}`} />
      <Divisor />
      <TagHeader name={pageContext.tag ?? ''} count={articles.totalCount} />
      {articles.edges.map(({ node: { frontmatter, fields, excerpt } }, index) => (
        <Article
          key={`article-${index}`}
          title={frontmatter?.title ?? ''}
          tags={frontmatter?.tags as string[]}
          date={frontmatter?.date}
          url={fields?.slug}
          language={frontmatter?.language}
          readingTime={fields?.readingTime?.minutes ?? 0}
          content={frontmatter?.description || excerpt}
        />
      ))}
    </Page>
  );
}

export const pageQuery = graphql`
  query TagsTemplate($tag: String) {
    articles: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
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
            tags
            description
            language
          }
        }
      }
    }
  }
`;
