import React from 'react';
import { render } from '@testing-library/react';

import { useStaticQuery, mockUseStaticQuery } from '../../__mocks__/useStaticQuery';
import NotFoundPage from '../404';

jest.mock('../../components/Footer', () => () => <p>Footer</p>);

describe('<NotFoundPage>', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders properly', () => {
    const { baseElement } = render(<NotFoundPage />);
    expect(baseElement).toMatchSnapshot();
  });
});
