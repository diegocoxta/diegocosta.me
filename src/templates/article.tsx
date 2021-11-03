import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

import { ArticleTemplateQuery } from '~/../graphql-types';

interface ArticleTemplateProps extends PageRendererProps {
  data: ArticleTemplateQuery;
}

export default function ArticleTemplate(props: ArticleTemplateProps): React.ReactElement {
  const article = props.data.article ?? props.data.articleLanguageFallback;
  const { body, excerpt, frontmatter, fields } = article ?? {};
  const { title, date, tags, description } = frontmatter ?? {};

  return (
    <Page>
      <Metatags title={title ?? ''} description={description || excerpt || ''} />
      <Divisor />
      <Article
        title={title ?? ''}
        date={date}
        tags={tags as string[]}
        readingTime={fields?.readingTime?.minutes ?? 0}
        language={fields?.language}
        mdxContent={body}
      />
    </Page>
  );
}

export const pageQuery = graphql`
  fragment articleFields on Mdx {
    body
    excerpt(pruneLength: 160)
    fields {
      readingTime {
        minutes
      }
      language
    }
    frontmatter {
      title
      date
      description
      tags
    }
  }
  query ArticleTemplate($slug: String!, $language: String!, $defaultLanguage: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    article: mdx(fields: { slug: { eq: $slug }, language: { eq: $language } }) {
      ...articleFields
    }
    articleLanguageFallback: mdx(fields: { slug: { eq: $slug }, language: { eq: $defaultLanguage } }) {
      ...articleFields
    }
  }
`;
