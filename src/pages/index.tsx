import React from 'react';
import { PageProps, graphql } from 'gatsby';

import Layout from '~/components/Layout';
import Article from '~/components/Article';

export default function IndexPage({ data }: PageProps<Queries.IndexPageQuery>) {
  return (
    <Layout showAboutMe>
      {data.content.edges?.map(({ node }) => (
        <Article
          key={node.fields?.slug}
          kind={node.fields?.collection}
          title={node.frontmatter?.title ?? ''}
          date={node.frontmatter?.date}
          url={node.fields?.slug}
          tags={node.frontmatter?.tags as string[]}
          readingTime={node.fields?.readingTime?.minutes ?? 0}
          language={node.fields?.language}
          content={
            node?.frontmatter?.flags?.includes('expanded-on-listings') ? node.html : node.frontmatter?.description
          }
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
    content: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { flags: { nin: ["hide-from-listings", "draft"] } }
        fields: { collection: { eq: "articles" } }
      }
    ) {
      edges {
        node {
          ...ArticleInformation
        }
      }
    }
  }
`;
