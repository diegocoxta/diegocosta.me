import React from 'react';
import { render } from '@testing-library/react';

import AboutMe from '../AboutMe';

describe('<AboutMe />', () => {
  it('should render properly', () => {
    const { baseElement } = render(<AboutMe mdxContent="You can hear more about here:" />);

    expect(baseElement).toMatchSnapshot();
  });
});
