import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);
jest.mock('../../components/ArticleHeader', () => () => <p>ArticleHeader</p>);
jest.mock('../../components/Metatags', () => () => <p>Metatags</p>);

import SinglePage from '../single';

describe('<SinglePage>', () => {
  it('should render properly', () => {
    const data = {
      markdownRemark: {
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

    const { baseElement, getByText } = render(<SinglePage data={data} />);
    expect(getByText('Post content')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
