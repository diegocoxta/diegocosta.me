import React from 'react';
import styled from 'styled-components';
import { useLocale, Link } from '~/hooks/useLocale';

const List = styled.div`
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

export default function LanguageSwitcher() {
  const locale = useLocale();

  return (
    <List>
      {locale.getAllLanguages().map((language: string) => (
        <LanguageLink
          aria-label={`${locale.getTranslationFor('Change the language to', 'header')} ${locale.getTranslationFor(
            language
          )}`}
          key={`footer-languages-${language}`}
          to={locale.getOriginalPath()}
          language={language}
        >
          {locale.getCurrentLanguage() === language && '/'}
          {language}
        </LanguageLink>
      ))}
    </List>
  );
}
