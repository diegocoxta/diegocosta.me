import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);
jest.mock('../../components/Metatags', () => () => <p>Metatags</p>);

jest.mock('@mdx-js/react', () => ({
  MDXProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('gatsby-plugin-mdx', () => ({
  MDXRenderer: jest.fn(({ children }) => <div>{children}</div>),
}));

import MdxTemplate from '../mdx';

describe('<MdxTemplate>', () => {
  it('should render properly', () => {
    const data = {
      mdxPage: {
        frontmatter: {
          title: 'Title 1',
        },
        fields: {
          slug: '/path-to-article',
        },
        body: 'Post content',
      },
    };

    const { baseElement, getByText } = render(<MdxTemplate data={data} />);
    expect(getByText('Post content')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
