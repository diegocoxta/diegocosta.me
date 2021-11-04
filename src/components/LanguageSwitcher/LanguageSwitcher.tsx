import React from 'react';
import styled from 'styled-components';
import { usei18n, Link } from '~/utils/i18n';

import Container from '~/components/Container';

const List = styled.div`
  display: flex;
  margin: 40px 0 0 0;
  justify-content: flex-end;
`;

const LanguageLink = styled(Link)`
  margin: 0 5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textColor};
  font-weight: 700;
  text-decoration: none;
`;

export default function LanguageSwitcher() {
  const i18n = usei18n();

  return (
    <Container>
      <List>
        {i18n.getAllLanguages().map((language) => (
          <LanguageLink
            aria-label={`${i18n.getTranslationFor('languageswitcher.toggle')} ${i18n.getTranslationFor(
              `languages.${language}`
            )}`}
            key={`footer-languages-${language}`}
            to={i18n.getOriginalPath()}
            language={language}
          >
            {i18n.getCurrentLanguage() === language && '/'}
            {language}
          </LanguageLink>
        ))}
      </List>
    </Container>
  );
}
