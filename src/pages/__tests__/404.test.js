import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);
jest.mock('../../components/Metatags', () => () => <p>Metatags</p>);
jest.mock('../../components/Search', () => () => <p>Search</p>);

import NotFoundPage from '../404';

describe('<NotFoundPage>', () => {
  it('should render properly', () => {
    const { baseElement } = render(<NotFoundPage />);
    expect(baseElement).toMatchSnapshot();
  });
});
