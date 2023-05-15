import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header, { HeaderProps } from './Header';

interface Props {
  metatags?: HeaderProps['metatags'];
  showAboutMe?: boolean;
}

export default (props: Props): React.ReactElement => {
  const {
    site: {
      siteMetadata: {
        aboutMe,
        getInTouch,
        metatags: { author },
      },
    },
  } = useStaticQuery(
    graphql`
      query HeaderComponent {
        site {
          siteMetadata {
            metatags {
              author
            }
            aboutMe {
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

  return (
    <Header
      author={author}
      aboutMe={aboutMe}
      navigation={getInTouch}
      metatags={props.metatags}
      showAboutMe={props.showAboutMe}
    />
  );
};
