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
      />
    );
    expect(getByText('Awesome Article')).toBeTruthy();
    expect(
      getByText('18/01/2020 · 5 article.minutes article.ofReading · article.languagePrefix languages.en')
    ).toBeTruthy();
    expect(getByTestId('article-header-custom-link').href).toBe('http://localhost/awesome-article');
    expect(getByTestId('article-header-tags')).toBeTruthy();
    expect(getAllByTestId('article-header-tag').length).toEqual(2);
    expect(baseElement).toMatchSnapshot();
  });

  it('does not render the tags', () => {
    const { baseElement, queryByTestId, queryAllByTestId } = render(
      <Article
        title="Awesome Article"
        url="/awesome-article"
        readingTime={5}
        language="pt"
        date="2020-07-20T22:12:03.284Z"
      />
    );

    expect(queryByTestId('article-header-tags')).toBeFalsy();
    expect(queryAllByTestId('article-header-tag').length).toEqual(0);
    expect(baseElement).toMatchSnapshot();
  });

  it('does not render the link', () => {
    const { baseElement, queryByTestId } = render(
      <Article title="Awesome Article" readingTime={5} language="en" date="2020-01-18T22:12:03.284Z" />
    );

    expect(queryByTestId('article-header-custom-link')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('does not render the reading time', () => {
    const { baseElement, getByText, queryByText } = render(
      <Article title="Awesome Article" language="en" date="2020-01-18T22:12:03.284Z" />
    );

    expect(
      queryByText('18/01/2020 · 5 article.minutes article.ofReading · article.languagePrefix languages.en')
    ).toBeFalsy();
    expect(getByText('18/01/2020 · article.languagePrefix languages.en')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('does not render the article language name', () => {
    const { baseElement, queryByText } = render(<Article title="Awesome Article" language="en" />);

    expect(
      queryByText('18/01/2020 · 5 article.minutes article.ofReading · article.languagePrefix languages.en')
    ).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the article details', () => {
    const { baseElement, getByText, getByTestId, getAllByTestId } = render(
      <Article
        title="Awesome Article"
        url="/awesome-article"
        readingTime={5}
        language="en"
        date="2020-01-18T22:12:03.284Z"
        tags={['jest', 'testing-library']}
      />
    );

    expect(
      getByText('18/01/2020 · 5 article.minutes article.ofReading · article.languagePrefix languages.en')
    ).toBeTruthy();
    expect(getByTestId('article-header-tags')).toBeTruthy();
    expect(getAllByTestId('article-header-tag').length).toEqual(2);

    expect(baseElement).toMatchSnapshot();
  });

  it('does not render the article details', () => {
    const { baseElement, queryByText, queryByTestId, queryAllByTestId } = render(
      <Article
        title="Awesome Article"
        url="/awesome-article"
        readingTime={5}
        language="en"
        date="2020-01-18T22:12:03.284Z"
        tags={['jest', 'testing-library']}
        showArticleDetails={false}
      />
    );

    expect(
      queryByText('18/01/2020 · 5 article.minutes article.ofReading · article.languagePrefix languages.en')
    ).toBeFalsy();
    expect(queryByTestId('article-header-tags')).toBeFalsy();
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
        mdxContent="Article as a Children"
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
        description="Article as a Children"
      />
    );

    expect(getByText('Article as a Children')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
