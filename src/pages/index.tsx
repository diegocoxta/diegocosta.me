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
      {articles.edges.map(({ node }, index: number) => (
        <Article
          key={`article-${index}`}
          article={node}
          showBodyContent={!!node.frontmatter?.homepage_view_full_article}
        />
      ))}
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexPage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
    aboutMe: markdownRemark(fields: { slug: { eq: "/home/" } }) {
      html
    }
    articles: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { collection: { eq: "articles" } }, frontmatter: { status: { eq: "published" } } }
    ) {
      edges {
        node {
          ...ArticleInformation
        }
      }
    }
  }
`;
