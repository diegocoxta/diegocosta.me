import React from 'react';
import { render } from '@testing-library/react';

import { usei18n, Link } from '../i18n';

describe('usei18n', () => {
  it('should return the correct values', () => {
    const i18n = usei18n();

    expect(i18n.getTranslationFor('test.key')).toBe('test.key');
    expect(i18n.getAllLanguages()).toEqual(['pt', 'en', 'es']);
    expect(i18n.getCurrentLanguage()).toEqual('pt');
    expect(i18n.getOriginalPath()).toBe('/about-us');
  });
});

describe('<Link />', () => {
  it('should render properly', () => {
    const { baseElement, getByText } = render(
      <Link to="/about-us" language="pt">
        Link to page
      </Link>
    );
    expect(getByText('Link to page')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
