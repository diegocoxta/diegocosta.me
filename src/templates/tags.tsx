import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Container from '~/components/Container';
import Metatags from '~/components/Metatags';
import ArticleHeader from '~/components/ArticleHeader';
import Article from '~/components/Article';
import PageTitle from '~/components/PageTitle';

import { TagsPageQuery, SitePageContext } from '~/../graphql-types';

interface TagsPageProps extends PageRendererProps {
  pageContext: SitePageContext;
  data: TagsPageQuery;
}

export default function Tags({ data, pageContext }: TagsPageProps): React.ReactElement {
  const {
    articles: { edges, totalCount },
  } = data;
  return (
    <Container>
      <Metatags title={`Publicações sobre ${pageContext.tag}`} />
      <PageTitle>{`${pageContext.tag} (${totalCount})`}</PageTitle>
      {edges.map(({ node: { frontmatter, fields, excerpt } }, index) => (
        <Article key={`article-${index}`} data-testid="tags-page-article">
          <ArticleHeader
            title={frontmatter?.title ?? ''}
            tags={frontmatter?.tags as string[]}
            date={frontmatter?.date}
            url={fields?.slug}
            lang={frontmatter?.lang}
            readingTime={fields?.readingTime?.minutes ?? 0}
          />
          {frontmatter?.description || excerpt}
        </Article>
      ))}
    </Container>
  );
}

export const pageQuery = graphql`
  query TagsPage($tag: String) {
    articles: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
            date(formatString: "DD/MM/YYYY")
            title
            tags
            description
            lang
          }
        }
      }
    }
  }
`;
