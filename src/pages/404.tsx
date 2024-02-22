import { graphql } from 'gatsby';

export { default } from '@app/templates/Blog';

export const query = graphql`
  query NotFoundPage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
  }
`;
