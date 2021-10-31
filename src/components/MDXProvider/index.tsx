import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import Talk from '~/components/Talk';

interface MDXProviderProps {
  children: React.ReactElement;
}

export default (props: MDXProviderProps): React.ReactElement => {
  const components = {
    Talk,
  };

  return <MDXProvider components={{ ...components }}>{props.children}</MDXProvider>;
};
