import React from 'react';
import { render } from '@testing-library/react';

import Talk from '../Talk';

describe('<Talk />', () => {
  it('renders properly', () => {
    const { baseElement, getByText, getAllByTestId, getByTestId } = render(
      <Talk
        title="Workshop React: da web ao app!"
        image="https://media.slid.es/thumbnails/f58621e7fcd466702bb9ad5858ce67ec/thumb.jpg?1634646022"
        description="blabla"
        urls={[
          { link: 'https://slides.com/diegocosta/workshop-react-da-web-ao-app', label: 'Slides', type: 'slide' },
          { link: 'https://github.com/ReactSSA/meetup1-web', label: 'Código Fonte', type: 'repository' },
        ]}
        language="pt"
      />
    );

    expect(getByText('Workshop React: da web ao app!')).toBeTruthy();
    expect(getByText('blabla')).toBeTruthy();
    expect(getByTestId('talk-description')).toBeTruthy();
    expect(getAllByTestId('talk-urls-item').length).toEqual(2);
    expect(getAllByTestId('talk-urls-list').length).toEqual(1);
    expect(baseElement).toMatchSnapshot();
  });

  it('does not render the url list', () => {
    const { baseElement, queryByTestId } = render(
      <Talk
        title="Workshop React: da web ao app!"
        image="https://media.slid.es/thumbnails/f58621e7fcd466702bb9ad5858ce67ec/thumb.jpg?1634646022"
        description="blabla"
      />
    );

    expect(queryByTestId('talk-urls-list')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('does not render the description', () => {
    const { baseElement, queryByTestId } = render(
      <Talk
        title="Workshop React: da web ao app!"
        image="https://media.slid.es/thumbnails/f58621e7fcd466702bb9ad5858ce67ec/thumb.jpg?1634646022"
      />
    );

    expect(queryByTestId('talk-description')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('does not render the language', () => {
    const { baseElement, queryByTestId } = render(
      <Talk
        title="Workshop React: da web ao app!"
        image="https://media.slid.es/thumbnails/f58621e7fcd466702bb9ad5858ce67ec/thumb.jpg?1634646022"
      />
    );

    expect(queryByTestId('talk-language')).toBeFalsy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the language', () => {
    const { baseElement, queryByTestId, getByText } = render(
      <Talk
        title="Workshop React: da web ao app!"
        image="https://media.slid.es/thumbnails/f58621e7fcd466702bb9ad5858ce67ec/thumb.jpg?1634646022"
        language="es"
      />
    );

    expect(queryByTestId('talk-language')).toBeTruthy();
    expect(getByText('article.languagePrefix languages.es')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the correctly icons', () => {
    const { baseElement, queryByTestId, getAllByTestId } = render(
      <Talk
        title="Workshop React: da web ao app!"
        image="https://media.slid.es/thumbnails/f58621e7fcd466702bb9ad5858ce67ec/thumb.jpg?1634646022"
        description="blabla"
        urls={[
          { link: 'https://slides.com/diegocosta/workshop-react-da-web-ao-app', label: 'Slides', type: 'slide' },
          { link: 'https://github.com/ReactSSA/meetup1-web', label: 'Código Fonte', type: 'repository' },
          { link: 'https://github.com/ReactSSA/meetup1-web', label: 'Código Fonte', type: 'video' },
        ]}
      />
    );

    expect(queryByTestId('talk-icon-video')).toBeTruthy();
    expect(queryByTestId('talk-icon-slide')).toBeTruthy();
    expect(queryByTestId('talk-icon-repository')).toBeTruthy();
    expect(getAllByTestId('talk-urls-item').length).toEqual(3);
    expect(getAllByTestId('talk-urls-list').length).toEqual(1);
    expect(baseElement).toMatchSnapshot();
  });
});
