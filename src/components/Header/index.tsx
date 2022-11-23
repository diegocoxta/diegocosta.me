import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';

export default (): React.ReactElement => {
  const {
    site: {
      siteMetadata: { author, avatar },
    },
  } = useStaticQuery(
    graphql`
      query HeaderComponent {
        site {
          siteMetadata {
            author
            avatar
          }
        }
      }
    `
  );

  return <Header author={author} avatar={avatar} />;
};
