import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

interface NotFoundPageProps extends PageRendererProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  }
}

function NotFoundPage(props: NotFoundPageProps) {
  const { title } = props.data.site.siteMetadata;

  return (
    <Layout location={props.location} title={title}>
      <>
        <SEO title="Não encontrado" />
        <h1>Não encontrado</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </>
    </Layout>
  );
}

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
