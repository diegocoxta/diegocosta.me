import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Page from '~/components/Page';
import Metatags from '~/components/Metatags';
import AboutMe from '~/components/AboutMe';
import Search from '~/components/Search';
import Article from '~/components/Article';
import Divisor from '~/components/Divisor';

import { IndexTemplateQuery } from '~/../graphql-types';

interface IndexTemplateProps extends PageRendererProps {
  data: IndexTemplateQuery;
}

export default function IndexTemplate({ data }: IndexTemplateProps): React.ReactElement {
  const { articles } = data;
  return (
    <Page>
      <Metatags />
      <AboutMe />
      <Divisor />
      <Search />
      {articles.edges.map(({ node: { frontmatter, fields, excerpt } }, index: number) => (
        <Article
          key={`article-${index}`}
          data-testid="index-page-article"
          title={frontmatter?.title ?? ''}
          date={frontmatter?.date}
          url={fields?.slug}
          tags={frontmatter?.tags as string[]}
          readingTime={fields?.readingTime?.minutes ?? 0}
          language={frontmatter?.language}
          content={frontmatter?.description || excerpt}
        />
      ))}
    </Page>
  );
}

export const pageQuery = graphql`
  query IndexTemplate {
    articles: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { collection: { eq: "articles" } } }
    ) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
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
            date(formatString: "DD/MM/YYYY")
            title
            description
            tags
            language
          }
        }
      }
    }
  }
`;
