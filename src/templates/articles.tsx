import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

import { ArticlesTemplateQuery } from '~/../graphql-types';

interface ArticlesTemplateProps extends PageRendererProps {
  data: ArticlesTemplateQuery;
}

export default function ArticlesTemplate(props: ArticlesTemplateProps): React.ReactElement {
  const { html, excerpt, frontmatter, fields } = props.data.article ?? {};
  const { title, date, tags, description } = frontmatter ?? {};

  console.log(props);

  return (
    <Layout>
      <Metatags title={title ?? ''} description={description || excerpt || ''} />
      <Divisor />
      <Article
        title={title ?? ''}
        date={date}
        tags={tags as string[]}
        readingTime={fields?.readingTime?.minutes ?? 0}
        language={fields?.language}
        content={html}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ArticlesTemplate($slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
  }
`;
