import React from 'react';
import { render } from '@testing-library/react';

import AboutMe from '../AboutMe';

describe('<AboutMe />', () => {
  it('renders properly', () => {
    const { baseElement, queryByTestId } = render(<AboutMe description="You can hear more about here:" />);
    expect(queryByTestId('about-me-navigation-list')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the navigation properly', () => {
    const { baseElement, getByTestId, queryAllByTestId, getAllByTestId } = render(
      <AboutMe
        description="You can hear more about here:"
        navigation={[
          { label: '', url: '' },
          { label: '', url: '' },
        ]}
      />
    );
    expect(getByTestId('about-me-navigation-list')).toBeTruthy();
    expect(queryAllByTestId('about-me-navigation-item')).toBeTruthy();
    expect(getAllByTestId('about-me-navigation-item').length).toEqual(2);
    expect(baseElement).toMatchSnapshot();
  });
});
