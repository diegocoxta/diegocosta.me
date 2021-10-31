import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);
jest.mock('../../components/Metatags', () => () => <p>Metatags</p>);

import TagsTemplate from '../tags';

describe('<TagsTemplate>', () => {
  it('should render properly', () => {
    const data = {
      articles: {
        totalCount: 2,
        edges: [
          {
            node: {
              frontmatter: {
                title: 'Title 1',
                date: '30/10/2020',
                tags: [],
                description: 'Awesome first article',
                language: 'en',
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
                language: 'pt',
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

    const { baseElement, getAllByTestId, getByText } = render(
      <TagsTemplate data={data} pageContext={{ tag: 'Tech Stuff' }} />
    );
    expect(getAllByTestId('article-item').length).toEqual(data.articles.totalCount);
    expect(getByText('Awesome second article')).toBeTruthy();
    expect(getByText('Awesome first article')).toBeTruthy();
    expect(getByText(`Tech Stuff (${data.articles.totalCount})`)).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
