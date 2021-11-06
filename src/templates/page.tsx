import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

import { PageTemplateQuery, PageTemplateQueryVariables } from '~/../graphql-types';
import TranslationMissingAlert from '~/components/TranslationMissingAlert';

interface PageTemplateProps extends PageRendererProps {
  data: PageTemplateQuery;
  pageContext: PageTemplateQueryVariables;
}

export default function PageTemplate(props: PageTemplateProps): React.ReactElement {
  const { data, pageContext } = props;
  const { page, translations } = data;
  const { body, frontmatter, fields } = page ?? {};
  const { title } = frontmatter ?? {};

  return (
    <Layout>
      <Metatags title={title ?? ''} />
      <Divisor />
      <TranslationMissingAlert
        slug={pageContext.slug}
        pageLanguage={pageContext.language}
        translations={translations?.translations}
      />
      <Article language={fields?.language} title={title ?? ''} mdxContent={body} showArticleDetails={false} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query PageTemplate($slug: String!, $language: String!) {
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
    translations: mdx(fields: { slug: { eq: $slug } }) {
      translations
    }
  }
`;
