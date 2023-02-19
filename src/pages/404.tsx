import React from 'react';
import { graphql } from 'gatsby';

import { usei18n } from '~/utils/i18n';
import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article/Article';

export default function NotFoundPage(): React.ReactElement {
  const i18n = usei18n();
  const title = i18n.getTranslationFor('404page.title');
  const content = i18n.getTranslationFor('404page.message');

  return (
    <Layout>
      <Metatags title={title} />
      <Divisor />
      <Article title={title} content={content} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query PageNotFoundQuery($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
  }
`;
