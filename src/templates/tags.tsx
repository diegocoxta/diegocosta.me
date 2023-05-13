import { graphql } from 'gatsby';

export { default } from '~/components/Page';

export const pageQuery = graphql`
  query TagsTemplate($tag: String, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
    list: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] }, status: { eq: "published" } } }
    ) {
      edges {
        node {
          ...ArticleInformation
        }
      }
    }
  }
`;
