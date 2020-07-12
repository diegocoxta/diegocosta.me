import React from 'react';
import { render } from '@testing-library/react';

import Article, { Content } from '../Article';

describe('<Article />', () => {
  it('should render properly', () => {
    const { baseElement, queryByText } = render(<Article>John Doe</Article>);
    expect(queryByText('John Doe')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});

describe('<Content />', () => {
  it('should render properly', () => {
    const { baseElement, queryByText } = render(<Content>John Doe</Content>);
    expect(queryByText('John Doe')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
