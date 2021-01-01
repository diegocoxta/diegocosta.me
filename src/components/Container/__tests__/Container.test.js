import React from 'react';
import { render } from '@testing-library/react';

import Container from '../Container';

jest.mock('../../Header', () => () => <p>Header</p>);
jest.mock('../../Footer', () => () => <p>Footer</p>);
jest.mock('../../Search', () => () => <p>Search</p>);
jest.mock('../../Navigation', () => () => <p>Navigation</p>);

describe('<Container />', () => {
  it('should render properly', () => {
    const { baseElement, queryByText } = render(<Container>John Doe</Container>);
    expect(queryByText('John Doe')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
