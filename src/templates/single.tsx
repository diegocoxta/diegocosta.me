import { graphql } from 'gatsby';

export { default } from '~/components/Page';

export const pageQuery = graphql`
  query SingleTemplate($slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
    content: markdownRemark(fields: { slug: { eq: $slug } }) {
      ...ArticleInformation
    }
  }
`;
