import React from 'react';
import { render } from '@testing-library/react';

import BodyPost from '../BodyPost';

describe('<BodyPost />', () => {
  it('renders properly', () => {
    const { baseElement, getByText } = render(<BodyPost html="My page BodyPost" />);

    expect(getByText('My page BodyPost')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
