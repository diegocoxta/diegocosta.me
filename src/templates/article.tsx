import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';
import MDXProvider from '~/components/MDXProvider';

import { ArticleTemplateQuery, ArticleTemplateQueryVariables } from '~/../graphql-types';

interface ArticleTemplateProps extends PageRendererProps {
  data: ArticleTemplateQuery;
  pageContext: ArticleTemplateQueryVariables;
}

export default function ArticleTemplate({ data, pageContext }: ArticleTemplateProps): React.ReactElement {
  const { isMdx, isMarkdown } = pageContext;
  const article = isMarkdown ? data.article : data.articleMdx;

  const { body, excerpt, frontmatter, fields } = article ?? {};
  const { title, date, tags, language, description } = frontmatter ?? {};

  return (
    <Page>
      <Metatags title={title ?? ''} description={description || excerpt || ''} />
      <Divisor />
      <MDXProvider>
        <Article
          title={title ?? ''}
          date={date}
          tags={tags as string[]}
          readingTime={fields?.readingTime?.minutes ?? 0}
          language={language}
          content={isMarkdown ? body : undefined}
        >
          {isMdx ? <MDXRenderer>{body ?? ''}</MDXRenderer> : undefined}
        </Article>
      </MDXProvider>
    </Page>
  );
}

export const pageQuery = graphql`
  query ArticleTemplate($slug: String!, $isMdx: Boolean!, $isMarkdown: Boolean!) {
    article: markdownRemark(fields: { slug: { eq: $slug } }) @include(if: $isMarkdown) {
      body: html
      excerpt(pruneLength: 160)
      fields {
        readingTime {
          minutes
        }
      }
      frontmatter {
        title
        date
        description
        tags
        language
      }
    }
    articleMdx: mdx(fields: { slug: { eq: $slug } }) @include(if: $isMdx) {
      excerpt(pruneLength: 160)
      body
      fields {
        readingTime {
          minutes
        }
      }
      frontmatter {
        title
        date
        description
        tags
        language
      }
    }
  }
`;
