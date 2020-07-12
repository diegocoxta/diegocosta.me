import React from 'react';
import { Helmet } from 'react-helmet';

export interface MetatagsProps {
  title: string;
  description: string;
  author: string;
  lang: string;
}

export default function Metatags(props: MetatagsProps): React.ReactElement {
  return (
    <Helmet
      htmlAttributes={{ lang: props.lang }}
      title={props.title}
      meta={[
        {
          name: `description`,
          content: props.description,
        },
        {
          property: `og:title`,
          content: props.title,
        },
        {
          property: `og:description`,
          content: props.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: props.author,
        },
        {
          name: `twitter:title`,
          content: props.title,
        },
        {
          name: `twitter:description`,
          content: props.description,
        },
      ]}
    />
  );
}
