import React from 'react';
import { render } from '@testing-library/react';

import Header from '../Header';

jest.mock('../../ThemeSwitcher', () => () => <p>ThemeSwitcher</p>);

describe('<Header />', () => {
  it('renders properly', () => {
    const { baseElement, getByTestId, getByText } = render(<Header author="John Doe" />);
    expect(getByTestId('header-lastname')).toBeTruthy();
    expect(getByText('John')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('does not render the last name', () => {
    const { baseElement, queryByTestId } = render(<Header author="John" />);
    expect(queryByTestId('header-lastname')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });
});
