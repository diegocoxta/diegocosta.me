import React from 'react';
import { render } from '@testing-library/react';

import ThemeSwitcher from '../ThemeSwitcher';

describe('<ThemeSwitcher />', () => {
  it('should render properly', () => {
    const { baseElement } = render(<ThemeSwitcher />);
    expect(baseElement).toMatchSnapshot();
  });
});
