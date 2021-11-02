import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <p>Header</p>);
jest.mock('../../components/Footer', () => () => <p>Footer</p>);
jest.mock('../../components/Metatags', () => () => <p>Metatags</p>);
/* jest.mock('../../helpers/i18n', () => ({
  usei18n: () => ({
    getTranslationFor: (key) => jest.fn(() => key),
    getAllLanguages: jest.fn(() => ['en', 'es', 'pt']),
    getOriginalPath: jest.fn(() => '/about-us'),
    getCurrentLanguage: jest.fn(() => 'pt'),
  }),
  Link: jest.fn().mockImplementation(({ to, ...rest }) => (
    <a href={to} {...rest}>
      link
    </a>
  )),
})); */

import PageTemplate from '../page';

describe('<PageTemplate>', () => {
  it('should render properly', () => {
    const props = {
      data: {
        page: {
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
