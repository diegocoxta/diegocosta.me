import React from 'react';
import { PageProps, graphql } from 'gatsby';

import Layout from '~/components/Layout';
import Resume from '~/components/Resume';

import { useLocale } from '~/hooks/useLocale';

export default function (props: PageProps<Queries.ResumePageQuery>) {
  const locale = useLocale();

  let { edges } = props.data.resume;

  if (edges.length > 1) {
    edges = edges.filter((i) => i.node.fields?.language === locale.getCurrentLanguage());
  }

  const content = edges[0].node;

  return (
    <Layout showAboutMe>
      <Resume {...content} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ResumePage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
    resume: allResumeYaml {
      edges {
        node {
          fields {
            language
          }
          work {
            company
            position
            startDate
            endDate
            summary
          }
          education {
            institution
            area
            startDate
            endDate
            score
          }
          languages {
            language
            description
          }
          references {
            name
            url
            reference
          }
        }
      }
    }
  }
`;
