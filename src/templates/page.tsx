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
  const page = data.page ?? data.pageLanguageFallback;
  const { body, frontmatter, fields } = page ?? {};
  const { title } = frontmatter ?? {};

  return (
    <Page>
      <Metatags title={title ?? ''} />
      <Divisor />
      <Article language={fields?.language} title={title ?? ''} mdxContent={body} />
    </Page>
  );
}

export const pageQuery = graphql`
  fragment pageFields on Mdx {
    body
    fields {
      language
    }
    frontmatter {
      title
    }
  }
  query PageTemplate($slug: String!, $language: String!, $defaultLanguage: String!) {
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
      ...pageFields
    }
    pageLanguageFallback: mdx(fields: { slug: { eq: $slug }, language: { eq: $defaultLanguage } }) {
      ...articleFields
    }
  }
`;
