import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import ArticleHeader, { ArticleHeaderProps } from './ArticleHeader';

export default (props: ArticleHeaderProps): React.ReactElement => {
  const {
    site: {
      siteMetadata: { language },
    },
  } = useStaticQuery(
    graphql`
      query ArticleHeaderComponent {
        site {
          siteMetadata {
            language
          }
        }
      }
    `
  );

  return <ArticleHeader {...props} lang={props.lang || language} />;
};
