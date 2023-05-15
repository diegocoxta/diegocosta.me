import React from 'react';
import { render } from '@testing-library/react';

import Footer from '../Footer';

describe('<Footer />', () => {
  it('renders properly', () => {
    const { baseElement, queryByText } = render(<Footer year={2020} />);
    expect(queryByText('source code')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the sourceCode url if defined', () => {
    const { baseElement, getByText } = render(
      <Footer year={2020} sourceCode="https://github.com/diegocoxta/diegocosta.me" />
    );
    expect(getByText('source code')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
