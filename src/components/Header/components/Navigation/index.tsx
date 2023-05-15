import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ThemeContext } from 'styled-components';
import { KBarProvider } from 'kbar';

import { useLocale } from '~/hooks/useLocale';

import Commander from './Navigation';

export default (): React.ReactElement => {
  const locale = useLocale();
  const themeContext = useContext(ThemeContext);

  const data: Queries.NavigationQuery = useStaticQuery(graphql`
    query Navigation {
      site {
        siteMetadata {
          sourceCode
        }
      }
      pages: allMarkdownRemark(filter: { frontmatter: { flags: { nin: ["hide-from-listings", "draft"] } } }) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
            collection
            language
          }
        }
      }
    }
  `);

  const currentLanguagePrefix = locale.getCurrentLanguage();

  const pages = data.pages.nodes.map((p) => ({
    id: `page-${p.fields?.slug}-${p.fields?.language}`,
    name: p.frontmatter?.title as string,
    section: locale.getTranslationFor('Pages', 'header'),
    perform: () => (window.location.href = `/${p.fields?.language}${p.fields?.slug}`),
    icon: 'BsFillFileEarmarkFill',
    parent: p.fields?.collection === 'articles' ? 'articles' : undefined,
  }));

  const languages = locale.getAllLanguages().map((language: string) => ({
    icon: 'BsTranslate',
    id: `language-${language}`,
    shortcut: ['g', 'l', language[0]],
    section: locale.getTranslationFor('Language', 'header'),
    parent: 'language',
    perform: () => (window.location.href = `/${language}`),
    name: locale.getTranslationFor(language, 'common'),
  }));

  const actions = [
    {
      id: 'home',
      name: locale.getTranslationFor('Home', 'header'),
      shortcut: ['g', 'h'],
      section: locale.getTranslationFor('Pages', 'header'),
      perform: () => (window.location.href = `/${currentLanguagePrefix}`),
      icon: 'BsFillHouseFill',
    },
    {
      id: 'articles',
      name: locale.getTranslationFor('Articles', 'header'),
      shortcut: ['g', 'a'],
      section: locale.getTranslationFor('Pages', 'header'),
      icon: 'BsNewspaper',
    },
    ...pages,
    {
      id: 'theme',
      name: locale.getTranslationFor('Theme', 'header'),
      shortcut: ['g', 't'],
      section: locale.getTranslationFor('Preferences', 'header'),
      icon: 'BsBrushFill',
    },
    {
      id: 'theme-light',
      name: locale.getTranslationFor('Light', 'header'),
      shortcut: ['g', 't', 'l'],
      section: locale.getTranslationFor('Theme', 'header'),
      parent: 'theme',
      perform: () => themeContext?.setMode('light'),
      icon: 'BsSun',
    },
    {
      id: 'theme-dark',
      name: locale.getTranslationFor('Dark', 'header'),
      shortcut: ['g', 't', 'd'],
      section: locale.getTranslationFor('Theme', 'header'),
      parent: 'theme',
      perform: () => themeContext?.setMode('dark'),
      icon: 'BsMoon',
    },
    {
      id: 'language',
      name: locale.getTranslationFor('Language', 'header'),
      shortcut: ['g', 'l'],
      section: locale.getTranslationFor('Preferences', 'header'),
      icon: 'BsTranslate',
    },
    ...languages,
    {
      id: 'source',
      name: locale.getTranslationFor('Source Code', 'header'),
      shortcut: ['g', 's'],
      section: locale.getTranslationFor('Tools', 'header'),
      perform: () => window.open(data.site?.siteMetadata?.sourceCode as string, '_blank'),
      icon: 'BsCodeSlash',
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <Commander placeholder={locale.getTranslationFor('Type a command or search…', 'header')} />
    </KBarProvider>
  );
};
