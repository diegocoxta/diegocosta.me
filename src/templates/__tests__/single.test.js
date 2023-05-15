import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);

import SingleTemplate from '../single';

describe('<SingleTemplate>', () => {
  it('renders properly', () => {
    const props = {
      pageContext: {
        lang: 'en',
        slug: '/path-to-article/',
      },
      data: {
        content: {
          edges: [
            {
              node: {
                frontmatter: {
                  title: 'Title 1',
                },
                fields: {
                  slug: '/path-to-article/',
                  language: 'en',
                },
                html: 'Post content',
              },
            },
          ],
        },
      },
    };

    const { baseElement, getByText } = render(<SingleTemplate {...props} />);
    expect(getByText('Post content')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('should renders properly even if the translation doesnt exists', () => {
    const props = {
      pageContext: {
        lang: 'pt',
        slug: '/path-to-article/',
      },
      data: {
        content: {
          edges: [
            {
              node: {
                frontmatter: {
                  title: 'Title 1',
                },
                fields: {
                  slug: '/path-to-article/',
                  language: 'en',
                },
                html: 'Post content',
              },
            },
          ],
        },
      },
    };

    const { getByText } = render(<SingleTemplate {...props} />);
    expect(getByText('Post content')).toBeTruthy();
  });

  it('should renders properly the translated article', () => {
    const props = {
      pageContext: {
        lang: 'pt',
        slug: '/path-to-article/',
      },
      data: {
        content: {
          edges: [
            {
              node: {
                frontmatter: {
                  title: 'Title 1',
                },
                fields: {
                  slug: '/path-to-article/',
                  language: 'en',
                },
                html: 'Post content',
              },
            },
            {
              node: {
                frontmatter: {
                  title: 'Title 1',
                },
                fields: {
                  slug: '/path-to-article/',
                  language: 'pt',
                },
                html: 'Conteúdo do Post',
              },
            },
          ],
        },
      },
    };

    const { getByText } = render(<SingleTemplate {...props} />);
    expect(getByText('Conteúdo do Post')).toBeTruthy();
  });
});
