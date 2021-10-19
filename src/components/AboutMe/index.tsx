import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import AboutMe from './AboutMe';

export default (): React.ReactElement => {
  const {
    aboutMe: { html },
  } = useStaticQuery(
    graphql`
      query AboutMeComponent {
        aboutMe: markdownRemark(fields: { slug: { eq: "/" } }) {
          html
        }
      }
    `
  );

  return <AboutMe htmlContent={html} />;
};
