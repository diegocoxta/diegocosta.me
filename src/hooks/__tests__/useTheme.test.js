import { renderHook, act } from '@testing-library/react-hooks';

import { useTheme } from '~/hooks/useTheme';

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
