import React from 'react';
import { graphql } from 'gatsby';

import Layout from '~/components/Layout';
import Article from '~/components/Article';

import { useLocale } from '~/hooks/useLocale';

export default function NotFoundPage(): React.ReactElement {
  const locale = useLocale();

  return (
    <Layout>
      <Article
        title={locale.getTranslationFor('Ops! Page not found!', 'page')}
        content={locale.getTranslationFor(
          "I'm sorry, but the page you're looking for cannot be found. Please check the URL or try navigating through the menu of my website. If the issue persists, please contact me.",
          'page'
        )}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query PageNotFound($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
  }
`;
