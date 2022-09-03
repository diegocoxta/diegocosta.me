import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);
jest.mock('../../components/Metatags', () => () => <p>Metatags</p>);

import PagesTemplate from '../pages';

describe('<PagesTemplate>', () => {
  it('renders properly', () => {
    const props = {
      pageContext: {
        lang: 'pt',
        slug: '/path-to-article/',
      },
      data: {
        page: {
          frontmatter: {
            title: 'Title 1',
          },
          fields: {
            slug: '/path-to-article/',
          },
          html: 'Post content',
        },
      },
    };

    const { baseElement, getByText } = render(<PagesTemplate {...props} />);
    expect(getByText('Post content')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
