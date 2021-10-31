import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);
jest.mock('../../components/Metatags', () => () => <p>Metatags</p>);
jest.mock('../../components/MDXProvider', () => ({ children }) => <div>{children}</div>);

import PageTemplate from '../page';

describe('<PageTemplate>', () => {
  it('should render markdown properly', () => {
    const props = {
      pageContext: {
        isMarkdown: true,
        isMdx: false,
      },
      data: {
        page: {
          frontmatter: {
            title: 'Title 1',
          },
          fields: {
            slug: '/path-to-article',
          },
          body: '<p>Post content</p>',
        },
      },
    };

    const { baseElement, getByText } = render(<PageTemplate {...props} />);
    expect(getByText('Post content')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('should render mdx properly', () => {
    const props = {
      pageContext: {
        isMarkdown: false,
        isMdx: true,
      },
      data: {
        pageMdx: {
          frontmatter: {
            title: 'Title 1',
          },
          fields: {
            slug: '/path-to-article',
          },
          body: 'Post content',
        },
      },
    };

    const { baseElement, getByText } = render(<PageTemplate {...props} />);
    expect(getByText('Post content')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
