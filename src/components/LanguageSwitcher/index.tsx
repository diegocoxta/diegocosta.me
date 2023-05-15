import { graphql } from 'gatsby';

export { default } from './LanguageSwitcher';

export const query = graphql`
  fragment LanguageInformation on LocaleConnection {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
`;
