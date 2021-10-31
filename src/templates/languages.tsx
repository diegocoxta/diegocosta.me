import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';
import AboutMe from '~/components/AboutMe';
import Search from '~/components/Search';

import { LanguageTemplateQuery } from '~/../graphql-types';

interface LanguagesTemplateProps extends PageRendererProps {
  data: LanguageTemplateQuery;
}

export default function LanguagesTemplate({ data }: LanguagesTemplateProps): React.ReactElement {
  const { articles, aboutMe } = data;

  return (
    <Page>
      <Metatags />
      <AboutMe htmlContent={aboutMe?.html ?? ''} />
      <Divisor />
      <Search />
      {articles.edges.map(({ node: { frontmatter, fields, excerpt } }, index) => (
        <Article
          key={`article-${index}`}
          title={frontmatter?.title ?? ''}
          tags={frontmatter?.tags as string[]}
          date={frontmatter?.date}
          url={fields?.slug}
          language={frontmatter?.language}
          readingTime={fields?.readingTime?.minutes ?? 0}
          content={frontmatter?.description || excerpt}
        />
      ))}
    </Page>
  );
}

export const pageQuery = graphql`
  query LanguageTemplate($language: String) {
    aboutMe: markdownRemark(fields: { slug: { eq: "/" } }) {
      html
    }
    articles: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { language: { eq: $language } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              minutes
            }
          }
          frontmatter {
            date
            title
            tags
            description
            language
          }
        }
      }
    }
  }
`;
