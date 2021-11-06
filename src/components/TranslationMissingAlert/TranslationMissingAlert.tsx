import React from 'react';
import styled from 'styled-components';

import { usei18n, Link } from '~/utils/i18n';
import FixedContainer from '~/components/FixedContainer';

const Content = styled.div`
  background: ${({ theme }) => theme.accentColor};
  padding: 20px;
  color: ${({ theme }) => theme.backgroundColor};
  margin: 20px 0;
`;

const Paragraph = styled.p`
  margin: 5px 0;
`;

const CustomLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  border-bottom: 1px dotted #ffffff;
`;

interface TranslationMissingAlertProps {
  slug: string;
  pageLanguage: string;
  translations?: (string | null | undefined)[] | null | undefined;
}

const renderSeparator = (index: number, length: number, separator: string): string => {
  if (index === 0 || index >= length) {
    return '';
  }

  return index + 1 !== length ? ', ' : ` ${separator} `;
};

export default function TranslationMissingAlert(props: TranslationMissingAlertProps): React.ReactElement {
  if (props.translations?.includes(props.pageLanguage)) {
    return <></>;
  }

  const i18n = usei18n();
  const title = i18n.getTranslationFor('translationMissingAlert.title');
  const subtitle = i18n.getTranslationFor('translationMissingAlert.subtitle');
  const separator = i18n.getTranslationFor('translationMissingAlert.separator');

  return (
    <FixedContainer>
      <Content data-testid="translation-missing-alert">
        <Paragraph>{title}</Paragraph>
        <Paragraph data-testid="translation-missing-alert-subtitle">
          {subtitle}{' '}
          {props.translations?.map((lang, index) => (
            <span key={`translation-missing-alert-${lang}`}>
              {renderSeparator(index, props.translations?.length ?? 0, separator)}
              <CustomLink language={lang} to={props.slug}>
                {i18n.getTranslationFor(`languages.${lang}`)}
              </CustomLink>
            </span>
          ))}
          .
        </Paragraph>
      </Content>
    </FixedContainer>
  );
}

TranslationMissingAlert.renderSeparator = renderSeparator;
