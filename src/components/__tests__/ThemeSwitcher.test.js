import React from 'react';
import { render, renderHook, act } from '@testing-library/react';

import ThemeSwitcher, { ThemeProvider, useTheme } from '../ThemeSwitcher';

describe('<ThemeSwitcher />', () => {
  it('renders properly', () => {
    const { baseElement } = render(<ThemeSwitcher />);
    expect(baseElement).toMatchSnapshot();
  });
});

describe('<ThemeProvider />', () => {
  it('renders properly', () => {
    const { baseElement, getByText } = render(
      <ThemeProvider>
        <p>child content</p>
      </ThemeProvider>
    );
    expect(getByText('child content')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});

describe('useTheme', () => {
  it('returns the correct properties', async () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current[0]).toBe('light');

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe('dark');

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe('light');
  });
});
