import React from 'react';
import { render } from '@testing-library/react';

import ArticleHeader from '../ArticleHeader';

describe('<ArticleHeader />', () => {
  it('should render properly', () => {
    const { baseElement, getByTestId, getByText, getAllByTestId } = render(
      <ArticleHeader
        title="Awesome Article"
        url="https://google.com"
        readingTime={5}
        lang="en"
        date="20/07/2020"
        tags={['jest', 'testing-library']}
      />
    );
    expect(getByText('Awesome Article')).toBeTruthy();
    expect(getByText('20/07/2020')).toBeTruthy();
    expect(getByText('5 minutes of reading')).toBeTruthy();
    expect(getByTestId('article-header-custom-link').href).toBe('https://google.com/');
    expect(getByTestId('article-header-tags')).toBeTruthy();
    expect(getAllByTestId('article-header-tag').length).toEqual(2);
    expect(baseElement).toMatchSnapshot();
  });

  it('should not render the tags', () => {
    const { baseElement, queryByTestId, queryAllByTestId } = render(
      <ArticleHeader title="Awesome Article" url="https://google.com" readingTime={5} lang="en" date="20/07/2020" />
    );

    expect(queryByTestId('article-header-tags')).toBeFalsy();
    expect(queryAllByTestId('article-header-tag').length).toEqual(0);
    expect(baseElement).toMatchSnapshot();
  });

  it('should not render the link', () => {
    const { baseElement, queryByTestId } = render(
      <ArticleHeader title="Awesome Article" readingTime={5} lang="en" date="20/07/2020" />
    );

    expect(queryByTestId('article-header-custom-link')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });
});
