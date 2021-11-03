import React from 'react';
import { graphql } from 'gatsby';

import { usei18n } from '~/helpers/i18n';
import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

export default function NotFoundPage(): React.ReactElement {
  const i18n = usei18n();
  const title = i18n.getTranslationFor('404page.title') ?? '';
  const message = i18n.getTranslationFor('404page.message');

  return (
    <Page>
      <Metatags title={title} />
      <Divisor />
      <Article title={title} description={message} />
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
