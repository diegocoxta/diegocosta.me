import React from 'react';
import { graphql } from 'gatsby';

export default function (props) {
  console.log({ props });
  return <p>Oi</p>;
}

export const pageQuery = graphql`
  query ResumePage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInformation
    }
    resume: allResumeYaml {
      edges {
        node {
          basics {
            summary
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
