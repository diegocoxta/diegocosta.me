import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

import { PageTemplateQuery } from '~/../graphql-types';

interface PageTemplateProps extends PageRendererProps {
  data: PageTemplateQuery;
}

export default function PageTemplate({ data }: PageTemplateProps): React.ReactElement {
  const { html, frontmatter } = data.article ?? {};
  const { title } = frontmatter ?? {};

  return (
    <Page>
      <Metatags title={title ?? ''} />
      <Divisor />
      <Article title={title ?? ''} content={html} />
    </Page>
  );
}

export const pageQuery = graphql`
  query PageTemplate($slug: String!) {
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
