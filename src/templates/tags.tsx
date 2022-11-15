import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import { usei18n } from '~/utils/i18n';

import Layout from '~/components/Layout';
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
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    articles: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          ...ArticleInformation
        }
      }
    }
  }
`;
