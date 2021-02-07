import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Footer from './Footer';

export default (): React.ReactElement => {
  const {
    site: {
      siteMetadata: { repository },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            repository
          }
        }
      }
    `
  );

  const year = new Date().getFullYear();

  return <Footer repository={repository} year={`2015-${year}`} />;
};
