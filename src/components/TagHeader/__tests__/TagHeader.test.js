import React from 'react';
import { render } from '@testing-library/react';

import TagHeader from '../TagHeader';

describe('<TagHeader />', () => {
  it('renders properly', () => {
    const { baseElement, queryByText } = render(<TagHeader name="John Doe" count={0} />);
    expect(queryByText('John Doe (0)')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
