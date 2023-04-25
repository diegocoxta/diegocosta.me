import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';

export default (): React.ReactElement => {
  const {
    site: {
      siteMetadata: {
        metatags: { author },
      },
    },
  } = useStaticQuery(
    graphql`
      query HeaderComponent {
        site {
          siteMetadata {
            metatags {
              author
            }
          }
        }
      }
    `
  );

  return <Header author={author} />;
};
