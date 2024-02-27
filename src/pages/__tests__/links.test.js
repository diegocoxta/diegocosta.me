import React from 'react';
import { render } from '@testing-library/react';

import { useStaticQuery, mockUseStaticQuery } from '~/__mocks__/graphql';
import Links from '../links';

jest.mock('../../components/Footer', () => () => <p>Footer</p>);

describe('<Links>', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders properly', () => {
    const { baseElement } = render(<Links />);
    expect(baseElement).toMatchSnapshot();
  });
});
