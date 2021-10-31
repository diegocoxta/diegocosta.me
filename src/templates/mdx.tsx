import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';
import Talk from '~/components/Talk';

import { MdxTemplateQuery } from '~/../graphql-types';

interface MdxTemplateProps extends PageRendererProps {
  data: MdxTemplateQuery;
}

export default function MdxTemplate({ data }: MdxTemplateProps): React.ReactElement {
  const { body, frontmatter } = data.mdxPage ?? {};
  const { title } = frontmatter ?? {};

  const allowedMDXComponents = {
    Talk,
  };

  return (
    <Page>
      <Metatags title={title ?? ''} />
      <Divisor />
      <MDXProvider components={{ ...allowedMDXComponents }}>
        <Article title={title ?? ''}>
          <MDXRenderer>{body ?? ''}</MDXRenderer>
        </Article>
      </MDXProvider>
    </Page>
  );
}

export const pageQuery = graphql`
  query MdxTemplate($slug: String!) {
    mdxPage: mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
      body
    }
  }
`;
