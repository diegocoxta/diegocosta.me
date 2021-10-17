import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import ArticleHeader from '~/components/ArticleHeader';
import Article, { Content } from '~/components/Article';
import Container from '~/components/Container';

import { ArticlePageQuery } from '~/../graphql-types';

interface ArticlePageProps extends PageRendererProps {
  data: ArticlePageQuery;
}

export default function ArticlePage({ data }: ArticlePageProps): React.ReactElement {
  const { html, excerpt, frontmatter, fields } = data.article ?? {};
  const { title, date, tags, lang, description } = frontmatter ?? {};

  return (
    <Page>
      <Metatags title={`${title} - Diego Costa`} description={description || excerpt || ''} />
      <Divisor />
      <Container>
        <Article>
          <ArticleHeader
            title={title ?? ''}
            date={date}
            tags={tags as string[]}
            readingTime={fields?.readingTime?.minutes ?? 0}
            lang={lang}
          />
          <Content dangerouslySetInnerHTML={{ __html: html ?? '' }} />
        </Article>
      </Container>
    </Page>
  );
}

export const pageQuery = graphql`
  query ArticlePage($slug: String!) {
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      html
      fields {
        readingTime {
          minutes
        }
      }
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY")
        description
        tags
        lang
      }
    }
  }
`;
