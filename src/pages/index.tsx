import { graphql } from 'gatsby';

export { default } from '~/components/Page';

export const pageQuery = graphql`
  query IndexPage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
    list: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { flags: { nin: ["hide-from-listings", "draft"] } }
        fields: { collection: { eq: "articles" } }
      }
    ) {
      edges {
        node {
          ...ArticleInformation
        }
      }
    }
  }
`;
