import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { usei18n } from '~/utils/i18n';

import AboutMe from './AboutMe';

export default (): React.ReactElement => {
  const i18n = usei18n();

  const {
    site: {
      siteMetadata: { bio, getInTouch },
    },
  } = useStaticQuery(
    graphql`
      query AboutMeComponent {
        site {
          siteMetadata {
            bio {
              pt
              en
            }
            getInTouch {
              label
              url
              rel
            }
          }
        }
      }
    `
  );

  const currentLanguage = i18n.getCurrentLanguage();

  return <AboutMe description={bio[currentLanguage]} navigation={getInTouch} />;
};
