import { graphql } from 'gatsby';

export { default } from '@app/templates/Blog';

export const pageQuery = graphql`
  query TagsTemplatePage($tag: String, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
    list: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] }, flags: { nin: ["hide-from-listings", "draft"] } } }
    ) {
      edges {
        node {
          ...ArticleInformation
        }
      }
    }
  }
`;
