import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Footer from './Footer';

export default (): React.ReactElement => {
  const {
    site: {
      siteMetadata: { sourceCode },
    },
  } = useStaticQuery(
    graphql`
      query FooterComponent {
        site {
          siteMetadata {
            sourceCode
          }
        }
      }
    `
  );

  const year = new Date().getFullYear();

  return <Footer sourceCode={sourceCode} year={year} />;
};
