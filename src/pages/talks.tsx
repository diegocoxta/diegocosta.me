import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import { usei18n } from '~/utils/i18n';

import FixedContainer from '~/components/FixedContainer';
import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Talk from '~/components/Talk';

import { TalksPageQuery } from '~/../graphql-types';

interface TalksPageProps extends PageRendererProps {
  data: TalksPageQuery;
}

export default function TaksPage({ data }: TalksPageProps): React.ReactElement {
  const i18n = usei18n();
  const talks = data.talks.byDate;

  return (
    <Layout>
      <Metatags title={`${i18n.getTranslationFor('tagsTemplate.titlePrefix')}`} />
      <Divisor />
      {talks.map(({ edges, date }, index) => (
        <FixedContainer key={index}>
          <h2>{date}</h2>
          {edges.map(({ node: { frontmatter, fields, excerpt } }) => (
            <Talk
              key={`talks-${index}`}
              title={frontmatter?.title ?? ''}
              url={fields.slug}
              description={frontmatter?.description || excerpt}
              language={fields?.language ?? ''}
            />
          ))}
        </FixedContainer>
      ))}
    </Layout>
  );
}

export const pageQuery = graphql`
  query TalksPage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    talks: allMdx(filter: { fields: { collection: { eq: "talks" } } }) {
      byDate: group(field: frontmatter___date) {
        date: fieldValue
        edges {
          node {
            frontmatter {
              title
              description
              featuredImage {
                childImageSharp {
                  gatsbyImageData(layout: FIXED)
                }
              }
            }
            fields {
              language
              slug
            }
            excerpt
          }
        }
      }
    }
  }
`;
