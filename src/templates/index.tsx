import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Page from '~/components/Page';
import Metatags from '~/components/Metatags';
import AboutMe from '~/components/AboutMe';
import Search from '~/components/Search';
import Article from '~/components/Article';
import Divisor from '~/components/Divisor';

import { IndexTemplateQuery } from '~/../graphql-types';

interface IndexTemplateProps extends PageRendererProps {
  data: IndexTemplateQuery;
}

export default function IndexTemplate({ data }: IndexTemplateProps): React.ReactElement {
  const { articles, aboutMe, articlesMdx } = data;

  const posts = [...articles.edges, ...articlesMdx.edges].sort(
    (a, b) => new Date(b.node.frontmatter?.date).getTime() - new Date(a.node.frontmatter?.date).getTime()
  );

  return (
    <Page>
      <Metatags />
      <AboutMe htmlContent={aboutMe?.html ?? ''} />
      <Divisor />
      <Search />
      {posts.map(({ node: { frontmatter, fields, excerpt } }, index: number) => (
        <Article
          key={`article-${index}`}
          title={frontmatter?.title ?? ''}
          date={frontmatter?.date}
          url={fields?.slug}
          tags={frontmatter?.tags as string[]}
          readingTime={fields?.readingTime?.minutes ?? 0}
          language={frontmatter?.language}
          content={frontmatter?.description || excerpt}
        />
      ))}
    </Page>
  );
}

export const pageQuery = graphql`
  query IndexTemplate {
    aboutMe: markdownRemark(fields: { slug: { eq: "/" } }) {
      html
    }
    articles: allMarkdownRemark(filter: { fields: { collection: { eq: "articles" } } }) {
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
            description
            tags
            language
          }
        }
      }
    }
    articlesMdx: allMdx(filter: { fields: { collection: { eq: "articles" } } }) {
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
            description
            tags
            language
          }
        }
      }
    }
  }
`;
