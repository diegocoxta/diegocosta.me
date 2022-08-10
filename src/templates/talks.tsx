import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

import { TalksTemplateQuery } from '~/../graphql-types';

interface TalksTemplateProps extends PageRendererProps {
  data: TalksTemplateQuery;
}

export default function TalksTemplate({ data }: TalksTemplateProps): React.ReactElement {
  const { page } = data;
  const { body, frontmatter, fields } = page ?? {};
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
  query TalksTemplate($slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    page: mdx(fields: { slug: { eq: $slug } }) {
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
