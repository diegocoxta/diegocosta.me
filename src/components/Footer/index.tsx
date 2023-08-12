import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Footer from './Footer';

export default (): React.ReactElement => {
  const {
    site: {
      siteMetadata: {
        sourceCode,
        metatags: { author },
      },
    },
  } = useStaticQuery(graphql`
    query FooterComponent {
      site {
        siteMetadata {
          sourceCode
          metatags {
            author
          }
        }
      }
    }
  `);

  const year = new Date().getFullYear();

  return <Footer sourceCode={sourceCode} year={year} author={author} />;
};
