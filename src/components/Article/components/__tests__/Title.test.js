import React from 'react';
import { render } from '@testing-library/react';

import Title from '../Title';

describe('<Title />', () => {
  it('renders properly', () => {
    const { baseElement, queryByTestId, getByText } = render(<Title title="Hello World" />);
    expect(queryByTestId('article-header-label')).toBeFalsy();
    expect(getByText('Hello World')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
