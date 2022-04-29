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
  const { body, frontmatter, fields } = data.page ?? {};
  const { title } = frontmatter ?? {};

  return (
    <Layout>
      <Metatags title={title ?? ''} />
      <Divisor />
      <Article language={fields?.language} title={title ?? ''} mdxContent={body} showArticleDetails={false} />
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
    page: mdx(fields: { slug: { eq: $slug }, language: { eq: $language } }) {
      body
      fields {
        language
      }
      frontmatter {
        title
      }
    }
  }
`;
