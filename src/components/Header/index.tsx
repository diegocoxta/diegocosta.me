import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';

export default ({ small }: { small: boolean }): React.ReactElement => {
  const {
    site: {
      siteMetadata: { author },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
          }
        }
      }
    `
  );

  return <Header small={small} author={author} />;
};
