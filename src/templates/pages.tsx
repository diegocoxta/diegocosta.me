import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

export default function PagesTemplate({ data }: PageProps<Queries.PagesTemplateQuery>): React.ReactElement {
  const { page } = data;

  return (
    <Layout>
      <Metatags title={page?.frontmatter?.title ?? ''} />
      <Divisor />
      <Article article={page} showMetaAttributes={false} showBodyContent={true} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query PagesTemplate($slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      ...ArticleInformation
    }
  }
`;
