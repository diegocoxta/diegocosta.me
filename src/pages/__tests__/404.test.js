import React from 'react';
import { render } from '@testing-library/react';

import NotFoundPage from '../404';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);

describe('<NotFoundPage>', () => {
  it('renders properly', () => {
    const { baseElement } = render(<NotFoundPage />);
    expect(baseElement).toMatchSnapshot();
  });
});
