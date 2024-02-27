import { graphql } from 'gatsby';

export { default } from '@app/templates/Blog';

export const query = graphql`
  query IndexPage {
    list: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { flags: { nin: ["hide-from-listings", "draft"] }, published: { ne: false } }
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
