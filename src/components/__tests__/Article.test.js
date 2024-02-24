import React from 'react';
import { render } from '@testing-library/react';

import Article from '../Article';

describe('<Article />', () => {
  it('renders properly', () => {
    const { baseElement, getByTestId, getByText, getAllByTestId } = render(
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
    expect(getByTestId('article-header-title').href).toBe('http://localhost/awesome-article');
    expect(getByTestId('article-header-tags')).toBeTruthy();
    expect(getAllByTestId('article-header-tag').length).toEqual(2);
    expect(baseElement).toMatchSnapshot();
  });

  it('does not render the tags', () => {
    const { baseElement, queryAllByTestId } = render(
      <Article
        title="Awesome Article"
        url="/awesome-article"
        readingTime={5}
        language="pt"
        date="2020-07-20T22:12:03.284Z"
      />
    );

    expect(queryAllByTestId('article-header-tag').length).toEqual(0);
    expect(baseElement).toMatchSnapshot();
  });

  it('does not render the link', () => {
    const { baseElement, queryByTestId } = render(
      <Article title="Awesome Article" readingTime={5} language="en" date="2020-01-18T22:12:03.284Z" />
    );

    expect(queryByTestId('article-header-title')).not.toHaveAttribute('href');
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the article details', () => {
    const { baseElement, getByTestId, getAllByTestId } = render(
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

    expect(getByTestId('article-header-tags')).toBeTruthy();
    expect(getAllByTestId('article-header-tag').length).toEqual(2);

    expect(baseElement).toMatchSnapshot();
  });

  it('does not render the article details', () => {
    const { baseElement, queryAllByTestId } = render(
      <Article
        title="Awesome Article"
        url="/awesome-article"
        readingTime={5}
        language="en"
        date="2020-01-18T22:12:03.284Z"
        tags={['jest', 'testing-library']}
      />
    );

    expect(queryAllByTestId('article-header-tag').length).toEqual(0);

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
