import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

export default function ArticlesTemplate({ data }: PageProps<Queries.ArticlesTemplateQuery>): React.ReactElement {
  const { article } = data;

  return (
    <Layout>
      <Metatags title={article?.frontmatter?.title ?? ''} />
      <Divisor />
      <Article article={article} showBodyContent={true} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ArticlesTemplate($slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      ...ArticleInformation
    }
  }
`;
