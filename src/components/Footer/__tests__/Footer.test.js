import React from 'react';
import { render } from '@testing-library/react';

import Footer from '../Footer';

describe('<Footer />', () => {
  it('should render properly', () => {
    const { baseElement, queryByText } = render(<Footer year={2020} />);
    expect(queryByText('footer.sourceCode')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the repository url if passed', () => {
    const { baseElement, getByText } = render(
      <Footer year={2020} repository="https://github.com/diegocosta/diegocosta.com.br" />
    );
    expect(getByText('footer.sourceCode')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
