import { graphql } from 'gatsby';

export { default } from '~/templates/Blog';

export const query = graphql`
  query SingleTemplatePage($slug: String!) {
    content: allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          ...ArticleInformation
        }
      }
    }
  }
`;
