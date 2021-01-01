import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Navigation from './Navigation';

export default (): React.ReactElement => {
  const {
    site: {
      siteMetadata: { contacts },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            contacts {
              label
              link
            }
          }
        }
      }
    `
  );

  return <Navigation list={contacts} />;
};
