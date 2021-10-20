import React from 'react';
import { render } from '@testing-library/react';

import Article from '../Article';

describe('<Article />', () => {
  it('should render properly', () => {
    const { baseElement, getByTestId, getByText, getAllByTestId } = render(
      <Article
        title="Awesome Article"
        url="/awesome-article"
        readingTime={5}
        language="en"
        date="20/07/2020"
        tags={['jest', 'testing-library']}
      />
    );
    expect(getByText('Awesome Article')).toBeTruthy();
    expect(getByText('20/07/2020 · 5 minutes of reading')).toBeTruthy();
    expect(getByTestId('article-header-custom-link').href).toBe('http://localhost/awesome-article');
    expect(getByTestId('article-header-tags')).toBeTruthy();
    expect(getAllByTestId('article-header-tag').length).toEqual(2);
    expect(baseElement).toMatchSnapshot();
  });

  it('should not render the tags', () => {
    const { baseElement, queryByTestId, queryAllByTestId, getByText } = render(
      <Article title="Awesome Article" url="/awesome-article" readingTime={5} language="pt" date="20/07/2020" />
    );

    expect(queryByTestId('article-header-tags')).toBeFalsy();
    expect(getByText('20/07/2020 · 5 minutos de leitura')).toBeTruthy();
    expect(queryAllByTestId('article-header-tag').length).toEqual(0);
    expect(baseElement).toMatchSnapshot();
  });

  it('should not render the link', () => {
    const { baseElement, queryByTestId } = render(
      <Article title="Awesome Article" readingTime={5} language="en" date="20/07/2020" />
    );

    expect(queryByTestId('article-header-custom-link')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('should render properly in Poruguese', () => {
    const { baseElement, getByText } = render(
      <Article title="Awesome Article" url="/awesome-article" readingTime={5} language="pt" date="20/07/2020" />
    );

    expect(getByText('20/07/2020 · 5 minutos de leitura')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
