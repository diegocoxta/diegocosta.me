import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);

import TagsTemplate from '../tags';

describe('<TagsTemplate>', () => {
  it('renders properly', () => {
    const data = {
      content: {
        totalCount: 2,
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
                language: 'en',
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
                language: 'en',
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

    const { baseElement, getAllByTestId, getByText } = render(<TagsTemplate data={data} />);
    expect(getAllByTestId('article-item').length).toEqual(data.content.totalCount);
    expect(getByText('Awesome second article')).toBeTruthy();
    expect(getByText('Awesome first article')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
