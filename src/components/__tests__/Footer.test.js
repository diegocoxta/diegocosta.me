import React from 'react';
import { render } from '@testing-library/react';

import Footer from '../Footer';

describe('<Footer />', () => {
  it('renders properly', () => {
    const { baseElement, queryByText } = render(<Footer author="diegocoxta" />);
    expect(queryByText('source code')).toBeFalsy();
    expect(queryByText('diegocoxta')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the sourceCode url if defined', () => {
    const { baseElement, queryByText, getByText } = render(
      <Footer author="@diegocoxta" sourceCode="https://github.com/diegocoxta/diegocosta.me" />
    );
    expect(queryByText('source code')).toBeTruthy();
    expect(getByText('source code').href).toBe('https://github.com/diegocoxta/diegocosta.me');
    expect(baseElement).toMatchSnapshot();
  });

  it('do not render the sourceCode url and author if not defined', () => {
    const { baseElement, queryByText, queryByTestId } = render(<Footer />);
    expect(queryByText('source code')).toBeFalsy();
    expect(queryByTestId('footer-source-code')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });
});
