import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '~/components/Layout';
import Article from '~/components/Article';

import { useLocale } from '~/hooks/useLocale';

export default function SingleTemplate({ data }: PageProps<Queries.SingleTemplateQuery>): React.ReactElement {
  const locale = useLocale();

  let content = data.content.edges;

  if (data.content.edges.length > 1) {
    content = data.content.edges.filter((i) => i.node.fields?.language === locale.getCurrentLanguage());
  }

  const metatags = {
    title: content?.[0]?.node.frontmatter?.title ?? undefined,
    description: content?.[0]?.node.frontmatter?.description ?? undefined,
  };

  return (
    <Layout metatags={metatags}>
      {content?.map(({ node }) => (
        <Article
          key={node.fields?.slug}
          kind={node.fields?.collection}
          title={node.frontmatter?.title ?? ''}
          date={node.frontmatter?.date}
          url={node.fields?.slug}
          tags={node.frontmatter?.tags as string[]}
          readingTime={node.fields?.readingTime?.minutes ?? 0}
          language={node.fields?.language}
          content={node.html}
        />
      ))}
    </Layout>
  );
}

export const pageQuery = graphql`
  query SingleTemplate($slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
    content: allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          ...ArticleInformation
        }
      }
    }
  }
`;
