import React from 'react';
import { Helmet } from 'react-helmet';

export interface MetatagsProps {
  title: string;
  description: string;
  author?: string;
  banner: string;
}

export default function Metatags(props: MetatagsProps): React.ReactElement {
  return (
    <Helmet
      title={props.title}
      meta={[
        {
          name: 'description',
          content: props.description,
        },
        {
          property: 'og:title',
          content: props.title,
        },
        {
          property: 'og:description',
          content: props.description,
        },
        {
          property: 'og:image',
          content: props.banner,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: props.author,
        },
        {
          name: 'twitter:title',
          content: props.title,
        },
        {
          name: 'twitter:description',
          content: props.description,
        },
      ]}
      htmlAttributes={{ lang: 'en' }}
    />
  );
}
