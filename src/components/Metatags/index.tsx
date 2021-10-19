import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Metatags, { MetatagsProps } from './Metatags';

type Props = Partial<Pick<MetatagsProps, 'title' | 'description' | 'image'>>;

export default (props: Props): React.ReactElement => {
  const {
    site: {
      siteMetadata: { title, description, author, language, image },
    },
  } = useStaticQuery(
    graphql`
      query MetatagsComponent {
        site {
          siteMetadata {
            title
            description
            author
            language
            image
          }
        }
      }
    `
  );

  const metaDescription = props.description || description;
  const metaTitle = props.title || title;
  const metaImage = props.image || image;

  return <Metatags title={metaTitle} description={metaDescription} lang={language} author={author} image={metaImage} />;
};
