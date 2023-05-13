import React from 'react';
import * as i18Next from 'gatsby-plugin-react-i18next';
import { Helmet as ReactHelmet } from 'react-helmet';

type useLocaleHook = {
  getTranslationFor: (key: string) => string;
  getCurrentLanguage: () => string;
  getAllLanguages: () => string[];
  getOriginalPath: () => string;
};

export function useLocale(): useLocaleHook {
  const { t } = i18Next.useTranslation();
  const context = i18Next.useI18next();

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

export function getContentLanguage(locale: useLocaleHook, langkey?: string | null) {
  if (!langkey) {
    return;
  }

  const languagePrefix = locale.getTranslationFor('article.languagePrefix');
  const languageName = locale.getTranslationFor(`languages.${langkey}`);

  return `${languagePrefix} ${languageName}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Link(props: any) {
  return <i18Next.Link {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Helmet(props: any) {
  return <ReactHelmet {...props} />;
}
