import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Links from './Links';

export default (): React.ReactElement => {
  const {
    site: {
      siteMetadata: {
        metatags: { author, description, avatar },
      },
    },
  } = useStaticQuery(graphql`
    query LinksTemplateQuery {
      site {
        siteMetadata {
          metatags {
            author
            description
            avatar
          }
        }
      }
    }
  `);

  return <Links author={author} description={description} avatar={avatar} />;
};
