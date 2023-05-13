import React from 'react';
import { render } from '@testing-library/react';

import { useLocale, Link } from '../useLocale';

describe('useLocale', () => {
  it('returns the correct values', () => {
    const locale = useLocale();

    expect(locale.getTranslationFor('test.key')).toBe('test.key');
    expect(locale.getAllLanguages()).toEqual(['pt', 'en', 'es']);
    expect(locale.getCurrentLanguage()).toEqual('pt');
    expect(locale.getOriginalPath()).toBe('/about-us');
  });
});

describe('<Link />', () => {
  it('renders properly', () => {
    const { baseElement, getByText } = render(
      <Link to="/about-us" language="pt">
        Link to page
      </Link>
    );
    expect(getByText('Link to page')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
