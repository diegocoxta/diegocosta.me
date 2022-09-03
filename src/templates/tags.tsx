import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import { usei18n } from '~/utils/i18n';

import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';
import TagHeader from '~/components/TagHeader';

import { TagsTemplateQuery, TagsTemplateQueryVariables } from '~/../graphql-types';

interface TagsTemplateProps extends PageRendererProps {
  pageContext: TagsTemplateQueryVariables;
  data: TagsTemplateQuery;
}

export default function Tags({ data, pageContext }: TagsTemplateProps): React.ReactElement {
  const { articles } = data;

  const i18n = usei18n();

  return (
    <Layout>
      <Metatags title={`${i18n.getTranslationFor('tagsTemplate.titlePrefix')} ${pageContext.tag}`} />
      <Divisor />
      <TagHeader name={pageContext.tag ?? ''} />
      {articles.edges.map(({ node: { frontmatter, fields, excerpt } }, index) => (
        <Article
          key={`article-${index}`}
          title={frontmatter?.title ?? ''}
          tags={frontmatter?.tags as string[]}
          date={frontmatter?.date}
          url={fields?.slug}
          language={fields?.language}
          readingTime={fields?.readingTime?.minutes ?? 0}
          content={frontmatter?.description || excerpt}
        />
      ))}
    </Layout>
  );
}

export const pageQuery = graphql`
  query TagsTemplate($tag: String, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    articles: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              minutes
            }
            language
          }
          frontmatter {
            date
            title
            tags
            description
          }
        }
      }
    }
  }
`;
