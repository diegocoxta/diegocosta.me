import React from 'react';
import { render } from '@testing-library/react';

import Layout from '../Layout';

jest.mock('../../Header', () => () => <p>Header</p>);
jest.mock('../../Footer', () => () => <p>Footer</p>);

describe('<Layout />', () => {
  it('renders properly', () => {
    const { baseElement, queryByText } = render(<Layout>John Doe</Layout>);
    expect(queryByText('John Doe')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
