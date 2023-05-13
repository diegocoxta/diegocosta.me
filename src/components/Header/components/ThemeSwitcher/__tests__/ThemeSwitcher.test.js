import React from 'react';
import { render } from '@testing-library/react';

import ThemeSwitcher from '../ThemeSwitcher';

describe('<ThemeSwitcher />', () => {
  it('renders properly', () => {
    const { baseElement } = render(<ThemeSwitcher />);
    expect(baseElement).toMatchSnapshot();
  });
});
