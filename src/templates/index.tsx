import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Container from '~/components/Container';
import Metatags from '~/components/Metatags';
import ArticleHeader from '~/components/ArticleHeader';
import Article from '~/components/Article';

import { IndexPageQuery } from '../../graphql-types';

interface IndexPageProps extends PageRendererProps {
  data: IndexPageQuery;
}

export default function IndexPage({ data }: IndexPageProps): React.ReactElement {
  const {
    articles: { edges },
  } = data;
  return (
    <Container>
      <Metatags />
      {edges.map(({ node: { frontmatter, fields, excerpt } }, index: number) => (
        <Article key={`article-${index}`} data-testid="index-page-article">
          <ArticleHeader
            title={frontmatter?.title ?? ''}
            date={frontmatter?.date}
            url={fields?.slug}
            tags={frontmatter?.tags as string[]}
            readingTime={fields?.readingTime?.minutes ?? 0}
            lang={frontmatter?.lang}
          />
          {frontmatter?.description || excerpt}
        </Article>
      ))}
    </Container>
  );
}

export const pageQuery = graphql`
  query IndexPage {
    articles: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
            lang
          }
        }
      }
    }
  }
`;
