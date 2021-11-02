import React from 'react';
import styled from 'styled-components';

import { usei18n } from '~/helpers/i18n';

import Container from '~/components/Container';

const Message = styled.div`
  background: ${({ theme }) => theme.accentColor};
  padding: 20px;
  color: ${({ theme }) => theme.backgroundColor};
  margin: 20px 0;
`;

interface LanguageNotFoundBoxProps {
  language?: string | null;
}

export default function LanguageNotFoundBox(props: LanguageNotFoundBoxProps): React.ReactElement {
  const i18n = usei18n();

  const pageLanguage = i18n.getCurrentLanguage();
  const articleTranslationNotFound = i18n.getTranslationFor('article.translationNotFound');
  const isValidTranslation = pageLanguage !== props.language;

  return <Container>{isValidTranslation ? <Message>{articleTranslationNotFound}</Message> : <></>}</Container>;
}
