import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Footer from './Footer';

export default () => {
  const {
    site: {
      siteMetadata: { contacts, repository },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            contacts {
              label
              link
            }
            repository
          }
        }
      }
    `
  );

  const year = new Date().getFullYear();

  return <Footer contacts={contacts} repository={repository} year={year} />;
};
