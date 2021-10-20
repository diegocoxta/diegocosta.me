import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);
jest.mock('../../components/Metatags', () => () => <p>Metatags</p>);
jest.mock('../../components/Search', () => () => <p>Search</p>);
jest.mock('../../components/AboutMe', () => () => <p>AboutMe</p>);

import LanguagesPage from '../languages';

describe('<LanguagesPage>', () => {
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

    const { baseElement, getByText } = render(<LanguagesPage data={data} pageContext={{ lang: 'en' }} />);
    expect(getByText('Awesome second article')).toBeTruthy();
    expect(getByText('Awesome first article')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
