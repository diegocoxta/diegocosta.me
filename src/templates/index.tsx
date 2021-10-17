import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Page from '~/components/Page';
import Metatags from '~/components/Metatags';
import AboutMe from '~/components/AboutMe';
import Search from '~/components/Search';
import ArticleHeader from '~/components/ArticleHeader';
import Article from '~/components/Article';
import Divisor from '~/components/Divisor';
import Container from '~/components/Container';

import { IndexPageQuery } from '~/../graphql-types';

interface IndexPageProps extends PageRendererProps {
  data: IndexPageQuery;
}

export default function IndexPage({ data }: IndexPageProps): React.ReactElement {
  const {
    articles: { edges },
  } = data;
  return (
    <Page>
      <Metatags />
      <AboutMe />
      <Divisor />
      <Search />
      <Container>
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
    </Page>
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
