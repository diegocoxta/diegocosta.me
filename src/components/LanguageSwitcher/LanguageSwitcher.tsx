import React from 'react';
import styled from 'styled-components';
import { usei18n, Link } from '~/helpers/i18n';

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

  const currentLanguage = i18n.getCurrentLanguage();
  const allLanguages = i18n.getAllLanguages();

  return (
    <Container>
      <List>
        {allLanguages.map((language) => (
          <LanguageLink key={`footer-languages-${language}`} to={i18n.getOriginalPath()} language={language}>
            {currentLanguage === language && '/'}
            {language}
          </LanguageLink>
        ))}
      </List>
    </Container>
  );
}
