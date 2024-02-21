import React from 'react';
import { render } from '@testing-library/react';

import { useStaticQuery, mockUseStaticQuery } from '../../__mocks__/useStaticQuery';
import SingleTemplate from '../_single';

jest.mock('../../components/Footer', () => () => <p>Footer</p>);

describe('<SingleTemplate>', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders properly', () => {
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
});
