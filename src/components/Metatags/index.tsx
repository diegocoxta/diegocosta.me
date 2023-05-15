import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Metatags, { MetatagsProps } from './Metatags';

export type Props = Partial<Pick<MetatagsProps, 'title' | 'description' | 'image'>>;

export default (props: Props): React.ReactElement => {
  const {
    site: {
      siteMetadata: {
        metatags: { title, description, author, image },
      },
    },
  } = useStaticQuery(
    graphql`
      query MetatagsComponent {
        site {
          siteMetadata {
            metatags {
              title
              description
              author
              image
            }
          }
        }
      }
    `
  );

  const metaDescription = props.description || description;
  const metaTitle = props.title ? `${props.title} - ${title}` : title;
  const metaImage = props.image || image;

  return <Metatags title={metaTitle} description={metaDescription} author={author} image={metaImage} />;
};
