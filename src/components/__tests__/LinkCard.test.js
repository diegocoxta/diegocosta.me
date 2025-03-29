import React from 'react';
import { render } from '@testing-library/react';

import LinkCard from '../LinkCard';

describe('<LinkCard />', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ message: 'Hello World' }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders properly', async () => {
    const { baseElement, findByText } = render(
      <LinkCard url="https://google.com" title="Google Inc." api="/api/my-api" />
    );

    expect(await findByText('Google Inc.')).toBeTruthy();
    expect(await findByText('google.com')).toBeTruthy();
    expect(await findByText('Hello World')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
