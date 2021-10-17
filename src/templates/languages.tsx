import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import ArticleHeader from '~/components/ArticleHeader';
import Article from '~/components/Article';
import Container from '~/components/Container';
import PageTitle from '~/components/PageTitle';

import { LanguagePageQuery, SitePageContext } from '~/../graphql-types';

interface TagsPageProps extends PageRendererProps {
  pageContext: SitePageContext;
  data: LanguagePageQuery;
}

export default function Tags({ data, pageContext }: TagsPageProps): React.ReactElement {
  const {
    articles: { edges },
  } = data;

  const languages: { [key: string]: string } = {
    pt: 'Publicações em Português',
    en: 'Posts in English',
  };

  const currentTitle = languages[pageContext.lang as string];

  return (
    <Page>
      <Metatags title={`${currentTitle} - Diego Costa`} />
      <Divisor />
      <Container>
        <PageTitle>{currentTitle}</PageTitle>
        {edges.map(({ node: { frontmatter, fields, excerpt } }, index) => (
          <Article key={`article-${index}`} data-testid="languages-page-article">
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
    </Page>
  );
}

export const pageQuery = graphql`
  query LanguagePage($lang: String) {
    articles: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { lang: { in: [$lang] } } }
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
