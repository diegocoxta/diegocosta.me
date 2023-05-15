import { graphql } from 'gatsby';

export { default } from './Article';

export const query = graphql`
  fragment ArticleInformation on MarkdownRemark {
    html
    excerpt
    fields {
      collection
      slug
      language
      readingTime {
        minutes
      }
    }
    frontmatter {
      date
      title
      description
      tags
      flags
    }
  }
`;
