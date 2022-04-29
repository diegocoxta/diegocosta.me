import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);
jest.mock('../../components/Metatags', () => () => <p>Metatags</p>);

import ArticlesTemplate from '../articles';

describe('<ArticlesTemplate>', () => {
  it('renders properly', () => {
    const props = {
      pageContext: {
        lang: 'pt',
        slug: '/path-to-article/',
      },
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

    const { baseElement, getByText } = render(<ArticlesTemplate {...props} />);
    expect(getByText('Post content')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
