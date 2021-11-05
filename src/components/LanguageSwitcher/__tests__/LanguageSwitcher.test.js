import React from 'react';
import { render } from '@testing-library/react';

import LanguageSwitcher from '../LanguageSwitcher';

describe('<LanguageSwitcher />', () => {
  it('renders properly', () => {
    const { baseElement } = render(<LanguageSwitcher />);
    expect(baseElement).toMatchSnapshot();
  });

  it('renders all mocked languages', () => {
    const { getByText } = render(<LanguageSwitcher />);
    expect(getByText('en')).toBeTruthy();
    expect(getByText('es')).toBeTruthy();
    expect(getByText('/pt')).toBeTruthy();
  });
});
