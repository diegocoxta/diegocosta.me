import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);
jest.mock('../../components/ArticleHeader', () => () => <p>ArticleHeader</p>);
jest.mock('../../components/Metatags', () => () => <p>Metatags</p>);
jest.mock('../../components/Search', () => () => <p>Search</p>);

import ArticlePage from '../article';

describe('<ArticlePage>', () => {
  it('should render properly', () => {
    const data = {
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
        html: '<p>Post content</p>',
      },
    };

    const { baseElement, getByText } = render(<ArticlePage data={data} />);
    expect(getByText('Post content')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
