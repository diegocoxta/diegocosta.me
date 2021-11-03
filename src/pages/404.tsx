import React from 'react';
import { graphql } from 'gatsby';

import { usei18n } from '~/helpers/i18n';
import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

export default function NotFoundPage(): React.ReactElement {
  const i18n = usei18n();

  return (
    <Page>
      <Metatags title={i18n.getTranslationFor('404page.title')} />
      <Divisor />
      <Article
        title={i18n.getTranslationFor('404page.title')}
        bodyContent={i18n.getTranslationFor('404page.message')}
      />
    </Page>
  );
}

export const pageQuery = graphql`
  query PageNotFoundQuery($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
