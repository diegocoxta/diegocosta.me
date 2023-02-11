import React from 'react';
import { useTranslation, useI18next, Link as Reacti18nextLink } from 'gatsby-plugin-react-i18next';
import { Helmet as ReactHelmet } from 'react-helmet';

export function usei18n() {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Link(props: any) {
  return <Reacti18nextLink {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Helmet(props: any) {
  return <ReactHelmet {...props} />;
}
