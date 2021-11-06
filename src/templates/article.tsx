import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';
import TranslationMissingAlert from '~/components/TranslationMissingAlert';

import { ArticleTemplateQuery, ArticleTemplateQueryVariables } from '~/../graphql-types';

interface ArticleTemplateProps extends PageRendererProps {
  data: ArticleTemplateQuery;
  pageContext: ArticleTemplateQueryVariables;
}

export default function ArticleTemplate(props: ArticleTemplateProps): React.ReactElement {
  const { data, pageContext } = props;
  const { article, translations } = data;
  const { body, excerpt, frontmatter, fields } = article ?? {};
  const { title, date, tags, description } = frontmatter ?? {};

  return (
    <Layout>
      <Metatags title={title ?? ''} description={description || excerpt || ''} />
      <Divisor />
      <TranslationMissingAlert
        slug={pageContext.slug}
        pageLanguage={pageContext.language}
        translations={translations?.translations}
      />
      <Article
        title={title ?? ''}
        date={date}
        tags={tags as string[]}
        readingTime={fields?.readingTime?.minutes ?? 0}
        language={fields?.language}
        mdxContent={body}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ArticleTemplate($slug: String!, $language: String!) {
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
    translations: mdx(fields: { slug: { eq: $slug } }) {
      translations
    }
  }
`;
