import React from 'react';
import { render } from '@testing-library/react';

import Divisor from '../Divisor';

describe('<Divisor />', () => {
  it('should render properly', () => {
    const { baseElement } = render(<Divisor />);
    expect(baseElement).toMatchSnapshot();
  });
});
