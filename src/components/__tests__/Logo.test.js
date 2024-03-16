import React from 'react';
import { render } from '@testing-library/react';

import Logo from '../Logo';

describe('<Logo />', () => {
  it('renders properly', () => {
    const { baseElement, queryByText, queryByTestId } = render(
      <Logo name="Diego Costa" to="https://github.com/diegocoxta" />
    );
    expect(queryByText('Diego')).toBeTruthy();
    expect(queryByText('C.')).toBeTruthy();
    expect(queryByTestId('logo-link').href).toBe('https://github.com/diegocoxta');
    expect(baseElement).toMatchSnapshot();
  });

  it('do not render the last name if not defined', () => {
    const { baseElement, queryByText, queryByTestId } = render(<Logo name="Diego" />);
    expect(queryByText('Diego')).toBeTruthy();
    expect(queryByText('C.')).toBeFalsy();
    expect(queryByTestId('logo-link').href).toBe('http://localhost/');
    expect(baseElement).toMatchSnapshot();
  });
});
