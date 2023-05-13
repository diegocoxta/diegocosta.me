import React from 'react';
import { render } from '@testing-library/react';

import NotFoundPage from '../404';

describe('<NotFoundPage>', () => {
  it('renders properly', () => {
    const { baseElement } = render(<NotFoundPage />);
    expect(baseElement).toMatchSnapshot();
  });
});
