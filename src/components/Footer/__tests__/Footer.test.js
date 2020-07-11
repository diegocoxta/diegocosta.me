import React from 'react';
import { render } from '@testing-library/react';

import { Footer } from '../';

describe('<Footer />', () => {
  it('should render properly', () => {
    const contacts = [
      { link: 'mailto:johndoe@doe.com', label: 'email' },
      { link: 'https://google.com', label: 'site' },
    ];

    const { baseElement, queryByText } = render(<Footer year={2020} contacts={contacts} />);
    expect(queryByText('source code')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the repository url if passed', () => {
    const { baseElement, getByText } = render(
      <Footer year={2020} contacts={[]} repository="https://github.com/diegocosta/blog.diegocosta.com.br" />
    );
    expect(getByText('source code')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
