import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ThemeContext } from 'styled-components';

import { CommanderQueryQuery } from '~/../graphql-types';
import { usei18n } from '~/utils/i18n';

import Commander from './Commander';

export default (): React.ReactElement => {
  const i18n = usei18n();
  const themeContext = useContext(ThemeContext);

  const data: CommanderQueryQuery = useStaticQuery(graphql`
    query CommanderQuery {
      site {
        siteMetadata {
          repository
          navigation {
            primary {
              label
              url
              icon
            }
          }
        }
      }
      pages: allMarkdownRemark(filter: { fields: { collection: { eq: "pages" } } }) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  const pages = data.pages.nodes.map((p) => ({
    id: `page-${p.fields?.slug}`,
    name: p.frontmatter?.title as string,
    shortcut: undefined,
    keywords: p.fields?.slug as string,
    section: 'Pages',
    perform: () => (window.location.href = p.fields?.slug as string),
    icon: 'BsFillFileEarmarkFill',
  }));

  const primaryNavigation = data.site?.siteMetadata?.navigation?.primary?.map((p) => ({
    id: `page-${p?.url}`,
    name: p?.label as string,
    shortcut: undefined,
    keywords: p?.url as string,
    section: 'Follow',
    perform: () => window.open(p?.url as string, '_blank'),
    icon: p?.icon,
  })) as [];

  const actions = [
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: 'Pages',
      perform: () => (window.location.href = '/'),
      icon: 'BsFillHouseFill',
    },
    ...pages,
    ...primaryNavigation,
    {
      id: 'theme',
      name: 'Theme',
      shortcut: ['g', 't'],
      keywords: 'interface color dark light',
      section: 'Preferences',
      icon: 'BsBrushFill',
    },
    {
      id: 'theme-light',
      name: `Light`,
      shortcut: ['g', 't', 'l'],
      keywords: 'switch theme light',
      section: 'Theme',
      parent: 'theme',
      perform: () => themeContext?.setMode('light'),
      icon: 'BsSun',
    },
    {
      id: 'theme-dark',
      name: `Dark`,
      shortcut: ['g', 't', 'd'],
      keywords: 'switch theme dark',
      section: 'Theme',
      parent: 'theme',
      perform: () => themeContext?.setMode('dark'),
      icon: 'BsMoon',
    },
    {
      id: 'language',
      name: 'Language',
      shortcut: ['g', 'l'],
      keywords: 'interface language ',
      section: 'Preferences',
      icon: 'BsTranslate',
    },
    {
      id: 'language-english',
      name: `English`,
      shortcut: ['g', 'l', 'e'],
      keywords: 'switch language english',
      section: 'Language',
      parent: 'language',
      perform: () => (window.location.href = '/en'),
      icon: 'BsTranslate',
    },
    {
      id: 'language-portuguese',
      name: `Português`,
      shortcut: ['g', 'l', 'p'],
      keywords: 'switch language portugues',
      section: 'Language',
      parent: 'language',
      perform: () => (window.location.href = '/pt'),
      icon: 'BsTranslate',
    },
    {
      id: 'source',
      name: 'View Source',
      shortcut: ['g', 's'],
      keywords: 'view-source',
      section: 'Preferences',
      perform: () => window.open(data.site?.siteMetadata?.repository as string, '_blank'),
      icon: 'BsCodeSlash',
    },
    {
      id: 'rss',
      name: 'Subscribe to RSS',
      shortcut: ['g', 'r'],
      keywords: 'view-rss',
      section: 'Preferences',
      perform: () => window.open('/rss.xml', '_blank'),
      icon: 'BsRssFill',
    },
  ];

  return <Commander actions={actions} />;
};
