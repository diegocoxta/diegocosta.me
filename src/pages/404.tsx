import React from 'react';

import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

export default function NotFoundPage(): React.ReactElement {
  return (
    <Page>
      <Metatags title="Não encontrado" />
      <Divisor />
      <Article title="Não encontrado" description="Página não encontrada" />
    </Page>
  );
}
