import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Metatags, { MetatagsProps } from './Metatags';

type Props = Partial<Pick<MetatagsProps, 'title' | 'description'>>;

export default (props: Props): React.ReactElement => {
  const {
    site: {
      siteMetadata: { title, description, author, language },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            language
          }
        }
      }
    `
  );

  const metaDescription = props.description || description;
  const metaTitle = props.title || title;

  return <Metatags title={metaTitle} description={metaDescription} lang={language} author={author} />;
};
