import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import ArticleHeader from '~/components/ArticleHeader';
import Article from '~/components/Article';
import PageTitle from '~/components/PageTitle';
import Container from '~/components/Container';

import { TagsTemplateQuery, SitePageContext } from '~/../graphql-types';

interface TagsTemplateProps extends PageRendererProps {
  pageContext: SitePageContext;
  data: TagsTemplateQuery;
}

export default function Tags({ data, pageContext }: TagsTemplateProps): React.ReactElement {
  const {
    articles: { edges, totalCount },
  } = data;
  return (
    <Page>
      <Metatags title={`Publicações sobre ${pageContext.tag}`} />
      <Divisor />
      <Container>
        <PageTitle>{`${pageContext.tag} (${totalCount})`}</PageTitle>
        {edges.map(({ node: { frontmatter, fields, excerpt } }, index) => (
          <Article key={`article-${index}`} data-testid="tags-page-article">
            <ArticleHeader
              title={frontmatter?.title ?? ''}
              tags={frontmatter?.tags as string[]}
              date={frontmatter?.date}
              url={fields?.slug}
              lang={frontmatter?.language}
              readingTime={fields?.readingTime?.minutes ?? 0}
            />
            {frontmatter?.description || excerpt}
          </Article>
        ))}
      </Container>
    </Page>
  );
}

export const pageQuery = graphql`
  query TagsTemplate($tag: String) {
    articles: allMarkdownRemark(
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
            language
          }
        }
      }
    }
  }
`;
