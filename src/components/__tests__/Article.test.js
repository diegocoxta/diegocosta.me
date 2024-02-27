import React from 'react';
import { render } from '@testing-library/react';

import Article from '../Article';

describe('<Article />', () => {
  it('renders properly', () => {
    const { baseElement, getByTestId, getByText } = render(
      <Article
        title="Awesome Article"
        url="/awesome-article"
        readingTime={5}
        language="en"
        date="2020-01-18T22:12:03.284Z"
        tags={['jest', 'testing-library']}
        kind="articles"
      />
    );
    expect(getByText('Awesome Article')).toBeTruthy();
    expect(getByTestId('title').href).toBe('http://localhost/awesome-article');
    expect(baseElement).toMatchSnapshot();
  });

  it('renders properly the body content', () => {
    const { baseElement, getByText } = render(
      <Article
        title="Awesome Article"
        url="/awesome-article"
        readingTime={5}
        language="pt"
        date="2020-01-18T22:12:03.284Z"
        content="Article as a Children"
      />
    );

    expect(getByText('Article as a Children')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders properly the description', () => {
    const { baseElement, getByText } = render(
      <Article
        title="Awesome Article"
        url="/awesome-article"
        readingTime={5}
        language="pt"
        date="2020-01-18T22:12:03.284Z"
        content="Article as a Children"
      />
    );

    expect(getByText('Article as a Children')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
