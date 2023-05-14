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
      pages: allMarkdownRemark(filter: { frontmatter: { status: { ne: "draft" } } }) {
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

  console.log({ data });

  const currentLanguagePrefix = locale.getCurrentLanguage();

  const pages = data.pages.nodes.map((p) => ({
    id: `page-${p.fields?.slug}-${p.fields?.language}`,
    name: p.frontmatter?.title as string,
    section: locale.getTranslationFor('commander.pages'),
    perform: () => (window.location.href = `/${p.fields?.language}${p.fields?.slug}`),
    icon: 'BsFillFileEarmarkFill',
    parent: p.fields?.collection === 'articles' ? 'articles' : undefined,
  }));

  const languages = locale.getAllLanguages().map((language: string) => ({
    icon: 'BsTranslate',
    id: `language-${language}`,
    shortcut: ['g', 'l', language[0]],
    section: locale.getTranslationFor('commander.language'),
    parent: 'language',
    perform: () => (window.location.href = `/${language}`),
    name: locale.getTranslationFor(`languages.${language}`),
  }));

  const actions = [
    {
      id: 'home',
      name: locale.getTranslationFor('commander.home'),
      shortcut: ['g', 'h'],
      section: locale.getTranslationFor('commander.pages'),
      perform: () => (window.location.href = `/${currentLanguagePrefix}`),
      icon: 'BsFillHouseFill',
    },
    {
      id: 'articles',
      name: locale.getTranslationFor('commander.articles'),
      shortcut: ['g', 'a'],
      section: locale.getTranslationFor('commander.pages'),
      icon: 'BsNewspaper',
    },
    ...pages,
    {
      id: 'theme',
      name: locale.getTranslationFor('commander.theme'),
      shortcut: ['g', 't'],
      section: locale.getTranslationFor('commander.preferences'),
      icon: 'BsBrushFill',
    },
    {
      id: 'theme-light',
      name: locale.getTranslationFor('commander.themeLight'),
      shortcut: ['g', 't', 'l'],
      section: locale.getTranslationFor('commander.theme'),
      parent: 'theme',
      perform: () => themeContext?.setMode('light'),
      icon: 'BsSun',
    },
    {
      id: 'theme-dark',
      name: locale.getTranslationFor('commander.themeDark'),
      shortcut: ['g', 't', 'd'],
      section: locale.getTranslationFor('commander.theme'),
      parent: 'theme',
      perform: () => themeContext?.setMode('dark'),
      icon: 'BsMoon',
    },
    {
      id: 'language',
      name: locale.getTranslationFor('commander.language'),
      shortcut: ['g', 'l'],
      section: locale.getTranslationFor('commander.preferences'),
      icon: 'BsTranslate',
    },
    ...languages,
    {
      id: 'source',
      name: locale.getTranslationFor('commander.sourceCode'),
      shortcut: ['g', 's'],
      section: locale.getTranslationFor('commander.tools'),
      perform: () => window.open(data.site?.siteMetadata?.sourceCode as string, '_blank'),
      icon: 'BsCodeSlash',
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <Commander placeholder={locale.getTranslationFor('commander.placeholder')} />
    </KBarProvider>
  );
};
