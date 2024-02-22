import { graphql } from 'gatsby';

export { default } from '@app/templates/Blog';

export const pageQuery = graphql`
  query SingleTemplate($slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
    content: allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          ...ArticleInformation
        }
      }
    }
  }
`;
