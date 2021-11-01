import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);
jest.mock('../../components/Metatags', () => () => <p>Metatags</p>);
jest.mock('../../components/MDXProvider', () => ({ children }) => <div>{children}</div>);

import ArticleTemplate from '../article';

describe('<ArticleTemplate>', () => {
  it('should render properly', () => {
    const props = {
      data: {
        article: {
          frontmatter: {
            title: 'Title 1',
            date: '30/10/2020',
            tags: [],
            description: 'Awesome first article',
          },
          fields: {
            slug: '/path-to-article',
            readingTime: {
              minutes: 5,
            },
          },
          excerpt: 'Awesome first article',
          body: 'Post content',
        },
      },
    };

    const { baseElement, getByText } = render(<ArticleTemplate {...props} />);
    expect(getByText('Post content')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
