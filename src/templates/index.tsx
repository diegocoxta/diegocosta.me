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
  const { articles, aboutMe } = data;

  return (
    <Page>
      <Metatags />
      <AboutMe bodyContent={aboutMe?.body || ''} />
      <Divisor />
      <Search />
      {articles.edges.map(({ node: { frontmatter, fields, excerpt } }, index: number) => (
        <Article
          key={`article-${index}`}
          title={frontmatter?.title ?? ''}
          date={frontmatter?.date}
          url={fields?.slug}
          tags={frontmatter?.tags as string[]}
          readingTime={fields?.readingTime?.minutes ?? 0}
          language={fields?.language}
          description={frontmatter?.description || excerpt}
        />
      ))}
    </Page>
  );
}

export const pageQuery = graphql`
  query IndexTemplate($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    aboutMe: mdx(fields: { slug: { eq: "/home/" }, language: { eq: $language } }) {
      body
    }
    articles: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { collection: { eq: "articles" } } }
    ) {
      edges {
        node {
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
          }
        }
      }
    }
  }
`;
