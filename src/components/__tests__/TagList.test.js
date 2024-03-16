import React from 'react';
import { render } from '@testing-library/react';

import TagList from '../TagList';

describe('<TagList />', () => {
  it('renders properly', () => {
    const { baseElement, getByTestId, getAllByTestId, getByText } = render(
      <TagList tags={['jest', 'testing-library']} />
    );

    expect(getByTestId('taglist-list')).toBeTruthy();
    expect(getAllByTestId('taglist-item').length).toEqual(2);
    expect(getByText('#jest')).toBeTruthy();
    expect(getByText('#testing-library')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('does not render the tags', () => {
    const { baseElement, queryAllByTestId } = render(<TagList />);

    expect(queryAllByTestId('taglist-item').length).toEqual(0);
    expect(baseElement).toMatchSnapshot();
  });
});
