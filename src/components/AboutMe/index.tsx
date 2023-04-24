import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { usei18n } from '~/utils/i18n';

import AboutMe from './AboutMe';

export default (): React.ReactElement => {
  const i18n = usei18n();

  const {
    site: {
      siteMetadata: {
        aboutMe,
        navigation: { primary },
      },
    },
  } = useStaticQuery(
    graphql`
      query AboutMeComponent {
        site {
          siteMetadata {
            aboutMe {
              pt
              en
            }
            navigation {
              primary {
                label
                url
              }
            }
          }
        }
      }
    `
  );

  const currentLanguage = i18n.getCurrentLanguage();

  return <AboutMe description={aboutMe[currentLanguage]} navigation={primary} />;
};
