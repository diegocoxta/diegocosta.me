import React from 'react';
import { render } from '@testing-library/react';

import PageTitle from '../PageTitle';

describe('<PageTitle />', () => {
  it('should render properly', () => {
    const { baseElement, queryByText } = render(<PageTitle>John Doe</PageTitle>);
    expect(queryByText('John Doe')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
