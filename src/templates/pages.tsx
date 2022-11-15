import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

import { PagesTemplateQuery } from '~/../graphql-types';

interface PagesTemplateProps extends PageRendererProps {
  data: PagesTemplateQuery;
}

export default function PagesTemplate({ data }: PagesTemplateProps): React.ReactElement {
  const { page } = data;

  return (
    <Layout>
      <Metatags title={page?.frontmatter?.title ?? ''} />
      <Divisor />
      <Article article={page} showArticleMetaAttributes={false} showFullContent={true} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query PagesTemplate($slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    page: markdownRemark(fields: { slug: { eq: $slug }, language: { eq: $language } }) {
      ...ArticleInformation
    }
  }
`;
