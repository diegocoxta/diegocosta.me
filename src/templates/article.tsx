import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

import { ArticleTemplateQuery } from '~/../graphql-types';

interface ArticleTemplateProps extends PageRendererProps {
  data: ArticleTemplateQuery;
}

export default function ArticleTemplate({ data }: ArticleTemplateProps): React.ReactElement {
  const { body, excerpt, frontmatter, fields } = data.article ?? {};
  const { title, date, tags, language, description } = frontmatter ?? {};

  return (
    <Layout>
      <Metatags title={title ?? ''} description={description || excerpt || ''} />
      <Divisor />
      <Article
        title={title ?? ''}
        date={date}
        tags={tags as string[]}
        readingTime={fields?.readingTime?.minutes ?? 0}
        language={language}
        bodyContent={body}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ArticleTemplate($slug: String!) {
    article: mdx(fields: { slug: { eq: $slug } }) {
      body
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
  }
`;
