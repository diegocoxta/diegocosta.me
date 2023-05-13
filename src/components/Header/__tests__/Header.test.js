import React from 'react';
import { render } from '@testing-library/react';

import Header from '../Header';

jest.mock('../components/ThemeSwitcher', () => () => <p>ThemeSwitcher</p>);
jest.mock('../components/LanguageSwitcher', () => () => <p>LanguageSwitcher</p>);
jest.mock('../components/Navigation', () => () => <p>Navigation</p>);
jest.mock('../components/Metatags', () => () => <p>Metatags</p>);

describe('<Header />', () => {
  it('renders properly', () => {
    const { baseElement, getByTestId, getByText } = render(
      <Header author="John Doe" description={{ en: 'You can hear more about here:' }} />
    );
    expect(getByTestId('header-lastname')).toBeTruthy();
    expect(getByText('John')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('does not render the last name', () => {
    const { baseElement, queryByTestId } = render(<Header author="John" />);
    expect(queryByTestId('header-lastname')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the navigation properly', () => {
    const { baseElement, getByTestId, queryAllByTestId, getAllByTestId, getByText } = render(
      <Header
        author="John Doe"
        description="You can hear more about here:"
        navigation={[
          { label: '', url: '' },
          { label: '', url: '' },
        ]}
      />
    );

    expect(getByTestId('header-lastname')).toBeTruthy();
    expect(getByText('John')).toBeTruthy();
    expect(getByTestId('about-me-navigation-list')).toBeTruthy();
    expect(queryAllByTestId('about-me-navigation-item')).toBeTruthy();
    expect(getAllByTestId('about-me-navigation-item').length).toEqual(2);
    expect(baseElement).toMatchSnapshot();
  });
});
