import { graphql } from 'gatsby';

export { default } from '~/templates/Blog';

export const pageQuery = graphql`
  query PageNotFound($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
  }
`;
