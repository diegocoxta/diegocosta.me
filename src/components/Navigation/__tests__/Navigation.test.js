import React from 'react';
import { render } from '@testing-library/react';

import Navigation from '../Navigation';

describe('<Navigation />', () => {
  it('should render properly', () => {
    const contacts = [
      { link: 'mailto:johndoe@doe.com', label: 'email' },
      { link: 'https://google.com', label: 'site' },
    ];

    const { baseElement, queryByText } = render(<Navigation list={contacts} />);

    expect(queryByText('site')).toBeTruthy();
    expect(queryByText('email')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
