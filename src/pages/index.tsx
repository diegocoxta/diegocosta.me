import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Layout from '~/components/Layout';
import Metatags from '~/components/Metatags';
import AboutMe from '~/components/AboutMe';
import Search from '~/components/Search';
import Article from '~/components/Article';
import Divisor from '~/components/Divisor';

import { IndexPageQuery } from '~/../graphql-types';

interface IndexPageProps extends PageRendererProps {
  data: IndexPageQuery;
}

export default function IndexPage({ data }: IndexPageProps): React.ReactElement {
  const { articles, aboutMe } = data;

  return (
    <Layout>
      <Metatags />
      <AboutMe content={aboutMe?.html || ''} />
      <Divisor />
      <Search />
      {articles.edges.map(({ node: { frontmatter, fields, excerpt, html } }, index: number) => (
        <Article
          key={`article-${index}`}
          title={frontmatter?.title ?? ''}
          date={frontmatter?.date}
          url={fields?.slug}
          tags={frontmatter?.tags as string[]}
          readingTime={fields?.readingTime?.minutes ?? 0}
          language={fields?.language}
          content={frontmatter?.homepage_full_article ? html : frontmatter?.description || excerpt}
        />
      ))}
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexPage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    aboutMe: markdownRemark(fields: { slug: { eq: "/home/" }, language: { eq: $language } }) {
      html
    }
    articles: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { collection: { eq: "articles" } } }
    ) {
      edges {
        node {
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
            homepage_full_article
          }
        }
      }
    }
  }
`;
