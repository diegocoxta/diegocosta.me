import React from 'react';
import { render } from '@testing-library/react';

import TranslationMissingAlert from '../TranslationMissingAlert';

describe('<TranslationMissingAlert />', () => {
  it('renders properly with 2 languages available', () => {
    const { baseElement, getByText, queryByTestId, queryByText } = render(
      <TranslationMissingAlert slug="/path-to-article" pageLanguage="pt" translations={['en', 'es']} />
    );

    expect(queryByTestId('translation-missing-alert')).toBeTruthy();
    expect(getByText('languages.es')).toBeTruthy();
    expect(getByText('languages.en')).toBeTruthy();
    expect(queryByText('languages.pt')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders properly with 1 languages available', () => {
    const { baseElement, getByText, queryByTestId, queryByText } = render(
      <TranslationMissingAlert slug="/path-to-article" pageLanguage="pt" translations={['en']} />
    );

    expect(queryByTestId('translation-missing-alert')).toBeTruthy();
    expect(getByText('languages.en')).toBeTruthy();
    expect(queryByText('languages.es')).toBeFalsy();
    expect(queryByText('languages.pt')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('does not renders because the page exists', () => {
    const { baseElement, queryByText, queryByTestId } = render(
      <TranslationMissingAlert slug="/path-to-article" pageLanguage="pt" translations={['pt', 'en', 'pt']} />
    );

    expect(queryByTestId('translation-missing-alert')).toBeFalsy();
    expect(queryByText('languages.en')).toBeFalsy();
    expect(queryByText('languages.es')).toBeFalsy();
    expect(queryByText('languages.pt')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the language string properly', () => {
    expect(TranslationMissingAlert.renderSeparator(0, 0, 'y')).toBe('');
    expect(TranslationMissingAlert.renderSeparator(0, 3, 'y')).toBe('');
    expect(TranslationMissingAlert.renderSeparator(1, 3, 'y')).toBe(', ');
    expect(TranslationMissingAlert.renderSeparator(2, 3, 'y')).toBe(' y ');
    expect(TranslationMissingAlert.renderSeparator(2, 3, 'e')).toBe(' e ');
    expect(TranslationMissingAlert.renderSeparator(2, 3, 'and')).toBe(' and ');
    expect(TranslationMissingAlert.renderSeparator(3, 3, 'y')).toBe('');
    expect(TranslationMissingAlert.renderSeparator(4, 3, 'y')).toBe('');
  });
});
