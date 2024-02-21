import { graphql } from 'gatsby';

export { default } from '~/templates/Links';

export const pageQuery = graphql`
  query LinksPage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
  }
`;
