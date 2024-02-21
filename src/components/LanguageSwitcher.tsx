import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { useLocale, Link } from '~/hooks/useLocale';

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
