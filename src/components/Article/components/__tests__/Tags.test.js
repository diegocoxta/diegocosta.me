import React from 'react';
import { render } from '@testing-library/react';

import Tags from '../Tags';

describe('<Tags />', () => {
  it('renders properly', () => {
    const { baseElement, getByTestId, getAllByTestId, getByText } = render(<Tags tags={['jest', 'testing library']} />);
    expect(getByTestId('article-header-tags')).toBeTruthy();
    expect(getAllByTestId('article-header-tag').length).toEqual(2);
    expect(getByText('#testing-library')).toBeTruthy();
    expect(getByText('#jest')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders properly without tags', () => {
    const { baseElement, getByTestId, queryAllByTestId } = render(<Tags />);
    expect(getByTestId('article-header-tags')).toBeTruthy();
    expect(queryAllByTestId('article-header-tag').length).toEqual(0);
    expect(baseElement).toMatchSnapshot();
  });
});
