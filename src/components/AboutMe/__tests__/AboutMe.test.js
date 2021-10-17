import React from 'react';
import { render } from '@testing-library/react';

import AboutMe from '../AboutMe';

jest.mock('../../Navigation', () => () => <p>Navigation</p>);

describe('<AboutMe />', () => {
  it('should render properly', () => {
    const content = [
      'A passionate tech manager who loves the intersection of computers and people, I spend my days trying to help tech teams deliver their max potential.',
      "Currently at Nubank, I am working to simplify our users' relationship with their financial lives by providing a simple but powerful mobile experience.",
      'You can hear more about here:',
    ];

    const { baseElement, queryByText } = render(<AboutMe paragraphs={content} />);

    content.map((c) => expect(queryByText(c)).toBeTruthy());
    expect(baseElement).toMatchSnapshot();
  });
});
