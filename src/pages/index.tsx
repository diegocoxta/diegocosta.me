import { graphql } from 'gatsby';

export { default } from '~/templates/Blog';

export const query = graphql`
  query IndexPage {
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
