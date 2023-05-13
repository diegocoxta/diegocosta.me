import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';

export default (): React.ReactElement => {
  const {
    site: {
      siteMetadata: {
        bio,
        getInTouch,
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
            bio {
              pt
              en
            }
            getInTouch {
              label
              url
              rel
            }
          }
        }
      }
    `
  );

  return <Header author={author} description={bio} navigation={getInTouch} />;
};
