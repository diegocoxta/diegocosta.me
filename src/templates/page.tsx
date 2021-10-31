import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';
import MDXProvider from '~/components/MDXProvider';

import { PageTemplateQuery, PageTemplateQueryVariables } from '~/../graphql-types';

interface PageTemplateProps extends PageRendererProps {
  data: PageTemplateQuery;
  pageContext: PageTemplateQueryVariables;
}

export default function PageTemplate({ data, pageContext }: PageTemplateProps): React.ReactElement {
  const { isMdx, isMarkdown } = pageContext;
  const page = isMarkdown ? data.page : data.pageMdx;

  const { body, frontmatter } = page ?? {};
  const { title } = frontmatter ?? {};

  return (
    <Page>
      <Metatags title={title ?? ''} />
      <Divisor />
      <MDXProvider>
        <Article title={title ?? ''} content={isMarkdown ? body : undefined}>
          {isMdx ? <MDXRenderer>{body ?? ''}</MDXRenderer> : undefined}
        </Article>
      </MDXProvider>
    </Page>
  );
}

export const pageQuery = graphql`
  query PageTemplate($slug: String!, $isMdx: Boolean!, $isMarkdown: Boolean!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) @include(if: $isMarkdown) {
      body: html
      frontmatter {
        title
      }
    }
    pageMdx: mdx(fields: { slug: { eq: $slug } }) @include(if: $isMdx) {
      body
      frontmatter {
        title
      }
    }
  }
`;
