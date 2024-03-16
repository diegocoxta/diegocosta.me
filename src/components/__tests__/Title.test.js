import React from 'react';
import { render } from '@testing-library/react';

import Title from '../Title';

describe('<Title />', () => {
  it('renders properly', () => {
    const { baseElement, getByText } = render(<Title>My page title</Title>);

    expect(getByText('My page title')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('should render as link', () => {
    const { baseElement, getByText, getByTestId } = render(<Title to="https://google.com">My page title</Title>);

    expect(getByText('My page title')).toBeTruthy();
    expect(getByTestId('title').href).toBe('https://google.com/');
    expect(baseElement).toMatchSnapshot();
  });
});
