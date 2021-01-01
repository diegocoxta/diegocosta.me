import React from 'react';
import { render } from '@testing-library/react';

import Header from '../Header';

jest.mock('../../Navigation', () => () => <p>Navigation</p>);

describe('<Header />', () => {
  it('should render properly', () => {
    const { baseElement, getByTestId, getByText } = render(<Header small={false} author="John Doe" />);
    expect(getByTestId('header-lastname')).toBeTruthy();
    expect(getByText('John')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('should not render the last name', () => {
    const { baseElement, queryByTestId } = render(<Header small={true} author="John" />);
    expect(queryByTestId('header-lastname')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });
});
