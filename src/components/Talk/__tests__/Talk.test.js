import React from 'react';
import { render } from '@testing-library/react';

import Talk from '../Talk';

describe('<Talk />', () => {
  it('renders properly', () => {
    const { baseElement, getByText, getByTestId } = render(
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
});
