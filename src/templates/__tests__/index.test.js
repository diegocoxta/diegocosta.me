import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);
jest.mock('../../components/ArticleHeader', () => () => <p>ArticleHeader</p>);
jest.mock('../../components/Metatags', () => () => <p>Metatags</p>);

import IndexPage from '../index';

describe('<IndexPage>', () => {
  it('should render properly', () => {
    const data = {
      articles: {
        edges: [
          {
            node: {
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
            },
          },
          {
            node: {
              frontmatter: {
                title: 'Title 2',
                date: '30/10/2020',
                tags: [],
                description: 'Awesome second article',
              },
              fields: {
                slug: '/path-to-article-2',
                readingTime: {
                  minutes: 2,
                },
              },
              excerpt: 'Awesome first article',
            },
          },
        ],
      },
    };

    const { baseElement, getAllByTestId, getByText } = render(<IndexPage data={data} />);
    expect(getAllByTestId('index-page-article').length).toEqual(2);
    expect(getByText('Awesome second article')).toBeTruthy();
    expect(getByText('Awesome first article')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
