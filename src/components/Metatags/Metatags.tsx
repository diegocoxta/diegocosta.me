import React from 'react';
import { Helmet } from '~/utils/i18n';

export interface MetatagsProps {
  title: string;
  description: string;
  author: string;
  image: string;
}

export default function Metatags(props: MetatagsProps): React.ReactElement {
  return (
    <Helmet
      title={props.title}
      link={[
        {
          rel: 'me',
          href: 'https://bolha.us/@diegocoxta',
        },
        {
          rel: 'me',
          href: 'https://mastodon.social/@diegocoxta',
        },
        {
          rel: 'me',
          href: 'https://ursal.zone/@diegocoxta',
        },
      ]}
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
          content: props.image,
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
    />
  );
}
