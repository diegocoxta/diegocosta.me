import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

import { PageTemplateQuery } from '~/../graphql-types';

interface PageTemplateProps extends PageRendererProps {
  data: PageTemplateQuery;
}

export default function PageTemplate({ data }: PageTemplateProps): React.ReactElement {
  const { body, frontmatter } = data.page ?? {};
  const { title } = frontmatter ?? {};

  return (
    <Layout>
      <Metatags title={title ?? ''} />
      <Divisor />
      <Article title={title ?? ''} bodyContent={body} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query PageTemplate($slug: String!) {
    page: mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
      }
    }
  }
`;
