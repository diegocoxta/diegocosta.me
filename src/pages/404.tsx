import React from 'react';

import Layout from '~/components/Layout';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import Article from '~/components/Article';

export default function NotFoundPage(): React.ReactElement {
  return (
    <Layout>
      <Metatags title="Não encontrado" />
      <Divisor />
      <Article title="Não encontrado" description="Página não encontrada" />
    </Layout>
  );
}
