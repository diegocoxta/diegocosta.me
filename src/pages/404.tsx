import React from 'react';
import { graphql } from 'gatsby';

import { useLocale } from '~/hooks/useLocale';

export default function NotFoundPage(): React.ReactElement {
  const locale = useLocale();
  const title = locale.getTranslationFor('404page.title');
  const content = locale.getTranslationFor('404page.message');

  return <>Page Not Found</>;
}

export const pageQuery = graphql`
  query PageNotFoundQuery($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
  }
`;
