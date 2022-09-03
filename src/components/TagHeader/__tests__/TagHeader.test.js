import React from 'react';
import { render } from '@testing-library/react';

import TagHeader from '../TagHeader';

describe('<TagHeader />', () => {
  it('renders properly', () => {
    const { baseElement, queryByText } = render(<TagHeader name="John Doe" />);
    expect(queryByText('John Doe')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
