import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import * as i18Next from 'gatsby-plugin-react-i18next';

type useLocaleHook = {
  getTranslationFor: (key: string) => string;
  getCurrentLanguage: () => string;
  getAllLanguages: () => string[];
  getOriginalPath: () => string;
};

const Container = styled.div`
  display: flex;
  margin: 40px 0 0 0;
  justify-content: flex-start;
`;

const LanguageLink = styled(Link)`
  margin: 0 5px;
  color: ${({ theme }) => theme.textColor};
  font-weight: 700;
  text-decoration: none;
  font-size: 22px;
`;

export const query = graphql`
  fragment LanguageInformation on LocaleConnection {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
`;

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

export default function LanguageSwitcher() {
  const locale = useLocale();

  return (
    <Container>
      {locale.getAllLanguages().map((language: string) => (
        <LanguageLink
          aria-label={`${locale.getTranslationFor('languageswitcher.toggle')} ${locale.getTranslationFor(
            `languages.${language}`
          )}`}
          key={`footer-languages-${language}`}
          to={locale.getOriginalPath()}
          language={language}
        >
          {locale.getCurrentLanguage() === language && '/'}
          {language}
        </LanguageLink>
      ))}
    </Container>
  );
}
