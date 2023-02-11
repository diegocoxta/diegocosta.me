import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';

export default (): React.ReactElement => {
  const {
    site: {
      siteMetadata: { author },
    },
  } = useStaticQuery(
    graphql`
      query HeaderComponent {
        site {
          siteMetadata {
            author
          }
        }
      }
    `
  );

  return <Header author={author} />;
};
