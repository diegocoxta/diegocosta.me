import React from 'react';
import { render } from '@testing-library/react';

import { useStaticQuery, mockUseStaticQuery, mockPageQuery } from '~/__mocks__/graphql';
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
          edges: [mockPageQuery.list.edges[0]],
        },
      },
    };

    const { baseElement, getByText } = render(<SingleTemplate {...props} />);
    expect(getByText('Post content')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
