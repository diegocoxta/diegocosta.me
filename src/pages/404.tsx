import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import PageTitle from '~/components/PageTitle';
import Container from '~/components/Container';

export default function NotFoundPage(): React.ReactElement {
  useEffect(() => {
    navigate('/'); // redirecting to home page
  }, []);

  return (
    <Page>
      <Metatags title="Não encontrado" />
      <Divisor />
      <Container>
        <PageTitle>Não encontrado</PageTitle>
      </Container>
    </Page>
  );
}
