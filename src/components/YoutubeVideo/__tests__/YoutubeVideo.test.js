import React from 'react';
import { render } from '@testing-library/react';

import YoutubeVideo from '../YoutubeVideo';

describe('<YoutubeVideo />', () => {
  it('renders properly', () => {
    const { baseElement, getByTestId } = render(<YoutubeVideo uuid="John Doe" />);
    expect(getByTestId('youtube-player')).toHaveAttribute('src', 'https://www.youtube.com/embed/John Doe');
    expect(baseElement).toMatchSnapshot();
  });
});
