import React from 'react';
import { render } from '@testing-library/react';

import { useStaticQuery, mockUseStaticQuery, mockPageQuery } from '@app/__mocks__/graphql';
import TagsTemplate from '../_tags';

jest.mock('../../components/Footer', () => () => <p>Footer</p>);

describe('<TagsTemplate>', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders properly', () => {
    const { baseElement, getAllByTestId, getByText } = render(<TagsTemplate data={mockPageQuery} />);
    expect(getAllByTestId('article-item').length).toEqual(mockPageQuery.list.totalCount);
    expect(getByText('Awesome second article')).toBeTruthy();
    expect(getByText('Awesome first article')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
