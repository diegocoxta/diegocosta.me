import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import AboutMe from './AboutMe';

export default (): React.ReactElement => {
  const {
    site: {
      siteMetadata: { aboutMe },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            aboutMe
          }
        }
      }
    `
  );

  return <AboutMe paragraphs={aboutMe} />;
};
