import { graphql } from 'gatsby';

export { default } from '~/templates/Blog';

export const query = graphql`
  query TagsTemplatePage($tag: String) {
    list: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { tags: { in: [$tag] }, flags: { nin: ["hide-from-listings", "draft"] }, published: { ne: false } }
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
