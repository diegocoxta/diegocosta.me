import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ThemeContext } from 'styled-components';
import { KBarProvider } from 'kbar';

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
          features {
            showCommandBarNavigation
          }
        }
      }
      pages: allMarkdownRemark(filter: { frontmatter: { status: { ne: "draft" } } }) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
            collection
          }
        }
      }
    }
  `);

  if (!data.site?.siteMetadata?.features?.showCommandBarNavigation) {
    return <></>;
  }

  const currentLanguagePrefix = i18n.getCurrentLanguage();

  const pages = data.pages.nodes.map((p) => ({
    id: `page-${p.fields?.slug}`,
    name: p.frontmatter?.title as string,
    section: i18n.getTranslationFor('commander.item.pages'),
    perform: () => (window.location.href = `/${currentLanguagePrefix}${p.fields?.slug}`),
    icon: 'BsFillFileEarmarkFill',
    parent: p.fields?.collection === 'articles' ? 'articles' : undefined,
  }));

  const actions = [
    {
      id: 'home',
      name: i18n.getTranslationFor('commander.item.home'),
      shortcut: ['g', 'h'],
      section: i18n.getTranslationFor('commander.item.pages'),
      perform: () => (window.location.href = `/${currentLanguagePrefix}`),
      icon: 'BsFillHouseFill',
    },
    {
      id: 'articles',
      name: i18n.getTranslationFor('commander.item.articles'),
      shortcut: ['g', 'a'],
      section: i18n.getTranslationFor('commander.item.pages'),
      icon: 'BsNewspaper',
    },
    ...pages,
    {
      id: 'theme',
      name: i18n.getTranslationFor('commander.item.theme'),
      shortcut: ['g', 't'],
      section: i18n.getTranslationFor('commander.item.preferences'),
      icon: 'BsBrushFill',
    },
    {
      id: 'theme-light',
      name: i18n.getTranslationFor('commander.item.themeLight'),
      shortcut: ['g', 't', 'l'],
      section: i18n.getTranslationFor('commander.item.theme'),
      parent: 'theme',
      perform: () => themeContext?.setMode('light'),
      icon: 'BsSun',
    },
    {
      id: 'theme-dark',
      name: i18n.getTranslationFor('commander.item.themeDark'),
      shortcut: ['g', 't', 'd'],
      section: i18n.getTranslationFor('commander.item.theme'),
      parent: 'theme',
      perform: () => themeContext?.setMode('dark'),
      icon: 'BsMoon',
    },
    {
      id: 'language',
      name: i18n.getTranslationFor('commander.item.language'),
      shortcut: ['g', 'l'],
      section: i18n.getTranslationFor('commander.item.preferences'),
      icon: 'BsTranslate',
    },
    {
      id: 'language-english',
      name: i18n.getTranslationFor('languages.en'),
      shortcut: ['g', 'l', 'e'],
      section: i18n.getTranslationFor('commander.item.language'),
      parent: 'language',
      perform: () => (window.location.href = '/en'),
      icon: 'BsTranslate',
    },
    {
      id: 'language-portuguese',
      name: i18n.getTranslationFor('languages.pt'),
      shortcut: ['g', 'l', 'p'],
      section: i18n.getTranslationFor('commander.item.language'),
      parent: 'language',
      perform: () => (window.location.href = '/pt'),
      icon: 'BsTranslate',
    },
    {
      id: 'rss',
      name: i18n.getTranslationFor('commander.item.rss'),
      shortcut: ['g', 'r'],
      section: i18n.getTranslationFor('commander.item.preferences'),
      perform: () => window.open('/rss.xml', '_blank'),
      icon: 'BsRssFill',
    },
    {
      id: 'source',
      name: i18n.getTranslationFor('commander.item.sourceCode'),
      shortcut: ['g', 's'],
      section: i18n.getTranslationFor('commander.item.preferences'),
      perform: () => window.open(data.site?.siteMetadata?.repository as string, '_blank'),
      icon: 'BsCodeSlash',
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <Commander placeholder={i18n.getTranslationFor('commander.placeholder')} />
    </KBarProvider>
  );
};
