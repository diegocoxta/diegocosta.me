import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';
import MDXProvider from '~/components/MDXProvider';

import { PageTemplateQuery } from '~/../graphql-types';

interface PageTemplateProps extends PageRendererProps {
  data: PageTemplateQuery;
}

export default function PageTemplate({ data }: PageTemplateProps): React.ReactElement {
  const { body, frontmatter } = data.page ?? {};
  const { title } = frontmatter ?? {};

  return (
    <Page>
      <Metatags title={title ?? ''} />
      <Divisor />
      <MDXProvider>
        <Article title={title ?? ''}>
          <MDXRenderer>{body ?? ''}</MDXRenderer>
        </Article>
      </MDXProvider>
    </Page>
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
