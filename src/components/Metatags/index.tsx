import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Metatags, { MetatagsProps } from './Metatags';

type Props = Partial<Pick<MetatagsProps, 'title' | 'description' | 'image'>>;

export default (props: Props): React.ReactElement => {
  const {
    site: {
      siteMetadata: { title, description, author, image, metatagLinks },
    },
  } = useStaticQuery(
    graphql`
      query MetatagsComponent {
        site {
          siteMetadata {
            title
            description
            author
            image
            metatagLinks {
              rel
              href
            }
          }
        }
      }
    `
  );

  const metaDescription = props.description || description;
  const metaTitle = props.title ? `${props.title} - ${title}` : title;
  const metaImage = props.image || image;

  return (
    <Metatags links={metatagLinks} title={metaTitle} description={metaDescription} author={author} image={metaImage} />
  );
};
