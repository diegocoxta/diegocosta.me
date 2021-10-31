import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);
jest.mock('../../components/Metatags', () => () => <p>Metatags</p>);

import PageTemplate from '../page';

describe('<PageTemplate>', () => {
  it('should render properly', () => {
    const data = {
      page: {
        frontmatter: {
          title: 'Title 1',
        },
        fields: {
          slug: '/path-to-article',
        },
        html: '<p>Post content</p>',
      },
    };

    const { baseElement, getByText } = render(<PageTemplate data={data} />);
    expect(getByText('Post content')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
