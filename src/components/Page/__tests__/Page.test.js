import React from 'react';
import { render } from '@testing-library/react';

import Page from '../Page';

jest.mock('../../Header', () => () => <p>Header</p>);
jest.mock('../../Footer', () => () => <p>Footer</p>);

describe('<Page />', () => {
  it('renders properly', () => {
    const { baseElement, queryByText } = render(<Page>John Doe</Page>);
    expect(queryByText('John Doe')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
