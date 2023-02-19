import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

import { ArticlesTemplateQuery } from '~/../graphql-types';

interface ArticlesTemplateProps extends PageRendererProps {
  data: ArticlesTemplateQuery;
}

export default function ArticlesTemplate({ data }: ArticlesTemplateProps): React.ReactElement {
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
