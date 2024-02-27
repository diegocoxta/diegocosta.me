import React from 'react';
import { render } from '@testing-library/react';

import { useStaticQuery, mockUseStaticQuery, mockPageQuery } from '~/__mocks__/graphql';
import IndexPage from '../index';

jest.mock('../../components/Footer', () => () => <p>Footer</p>);

describe('<IndexPage>', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders properly', () => {
    const { baseElement, getAllByTestId, getByText } = render(<IndexPage data={mockPageQuery} />);
    expect(getAllByTestId('article-item').length).toEqual(2);
    expect(getByText('Awesome second article')).toBeTruthy();
    expect(getByText('Awesome first article')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
