import React from 'react';
import { render } from '@testing-library/react';

import { useStaticQuery, mockUseStaticQuery } from '../../__mocks__/useStaticQuery';
import IndexPage from '../index';

jest.mock('../../components/Footer', () => () => <p>Footer</p>);

describe('<IndexPage>', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders properly', () => {
    const data = {
      list: {
        edges: [
          {
            node: {
              frontmatter: {
                title: 'Title 1',
                date: '2021-01-16T22:12:03.284Z',
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
                date: '2020-01-18T22:12:03.284Z',
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
      articlesMdx: {
        edges: [],
      },
    };

    const { baseElement, getAllByTestId, getByText } = render(<IndexPage data={data} />);
    expect(getAllByTestId('article-item').length).toEqual(2);
    expect(getByText('Awesome second article')).toBeTruthy();
    expect(getByText('Awesome first article')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
