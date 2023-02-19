import React from 'react';
import { useTranslation, useI18next, Link as Reacti18nextLink } from 'gatsby-plugin-react-i18next';
import { Helmet as ReactHelmet } from 'react-helmet';

type i18nHook = {
  getTranslationFor: (key: string) => string;
  getCurrentLanguage: () => string;
  getAllLanguages: () => string[];
  getOriginalPath: () => string;
};

export function usei18n(): i18nHook {
  const { t } = useTranslation();
  const context = useI18next();

  function getTranslationFor(key: string) {
    return t(key);
  }

  function getCurrentLanguage() {
    return context.language;
  }

  function getAllLanguages() {
    return context.languages;
  }

  function getOriginalPath() {
    return context.originalPath;
  }

  return {
    getTranslationFor,
    getCurrentLanguage,
    getAllLanguages,
    getOriginalPath,
  };
}

export function getContentLanguage(i18n: i18nHook, langkey?: string | null) {
  if (!langkey) {
    return;
  }

  const languagePrefix = i18n.getTranslationFor('article.languagePrefix');
  const languageName = i18n.getTranslationFor(`languages.${langkey}`);

  return `${languagePrefix} ${languageName}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Link(props: any) {
  return <Reacti18nextLink {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Helmet(props: any) {
  return <ReactHelmet {...props} />;
}
