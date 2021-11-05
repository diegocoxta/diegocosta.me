import React from 'react';
import { render } from '@testing-library/react';

import FixedContainer from '../FixedContainer';

describe('<FixedContainer />', () => {
  it('should render properly', () => {
    const { baseElement, queryByText } = render(<FixedContainer>John Doe</FixedContainer>);
    expect(queryByText('John Doe')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
