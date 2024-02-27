import React from 'react';
import { render } from '@testing-library/react';

import { useStaticQuery, mockUseStaticQuery } from '@app/__mocks__/graphql';
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
    const { baseElement, getByText } = render(<NotFoundPage />);
    expect(getByText('Ops! Page not found!')).toBeTruthy();
    expect(
      getByText(
        `I'm sorry, but the page you're looking for cannot be found. Please check the URL or try navigating through the menu of my website. If the issue persists, please contact me.`
      )
    ).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
