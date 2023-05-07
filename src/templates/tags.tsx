import React from 'react';
import { graphql, PageProps } from 'gatsby';

import { usei18n } from '~/utils/i18n';

import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';
import TagHeader from '~/components/TagHeader';

export default function Tags({
  data,
  pageContext,
}: PageProps<Queries.TagsTemplateQuery, Queries.TagsTemplateQueryVariables>): React.ReactElement {
  const { articles } = data;

  const i18n = usei18n();

  return (
    <Layout>
      <Metatags title={`${i18n.getTranslationFor('tagsTemplate.titlePrefix')} ${pageContext.tag}`} />
      <Divisor />
      <TagHeader name={pageContext.tag ?? ''} />
      {articles.edges.map(({ node }, index) => (
        <Article key={`article-${index}`} article={node} />
      ))}
    </Layout>
  );
}

export const pageQuery = graphql`
  query TagsTemplate($tag: String, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
    articles: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] }, status: { eq: "published" } } }
    ) {
      edges {
        node {
          ...ArticleInformation
        }
      }
    }
  }
`;
