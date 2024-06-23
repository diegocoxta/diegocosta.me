import React from 'react';
import { render } from '@testing-library/react';

import AboutMe from '../AboutMe';

const socialLinks = [
  { label: 'Github', url: 'https://github.com/diegocoxta', rel: 'me' },
  { label: 'Linkedin', url: 'https://linkedin.com/in/diegocoxta', rel: 'me' },
];

describe('<AboutMe />', () => {
  it('renders properly', () => {
    const { baseElement, getByText, queryAllByTestId, queryByText } = render(
      <AboutMe bio="my own bio" socialLinks={socialLinks} />
    );
    expect(getByText('my own bio')).toBeTruthy();
    expect(queryAllByTestId('about-me-bio')).toBeTruthy();
    expect(queryAllByTestId('about-me-sociallinks-item').length).toBe(2);
    expect(queryByText(socialLinks[0].label)).toBeTruthy();
    expect(queryByText(socialLinks[0].label)).toBeTruthy();
    expect(queryByText(socialLinks[0].label).href).toBe(socialLinks[0].url);
    expect(queryByText(socialLinks[1].label).href).toBe(socialLinks[1].url);
    expect(baseElement).toMatchSnapshot();
  });

  it('do not render bio and socialLinks if not defined', () => {
    const { baseElement, queryAllByTestId, queryByTestId } = render(<AboutMe />);
    expect(queryByTestId('about-me-bio')).toBeFalsy();
    expect(queryAllByTestId('about-me-sociallinks-item').length).toBe(0);
    expect(baseElement).toMatchSnapshot();
  });
});
