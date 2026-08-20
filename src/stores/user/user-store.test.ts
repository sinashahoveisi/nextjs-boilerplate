import {describe, it, expect, beforeEach} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import {useUserStore} from './user-store';

describe('useUserStore', () => {
  beforeEach(() => {
    localStorage.clear();
    act(() => {
      useUserStore.setState({token: undefined, refreshToken: undefined});
    });
  });

  it('initializes without a token', () => {
    const {result} = renderHook(() => useUserStore());
    expect(result.current.token).toBeUndefined();
  });

  it('sets token and refresh token', () => {
    const {result} = renderHook(() => useUserStore());

    act(() => {
      result.current.setToken('access-token', 'refresh-token');
    });

    expect(result.current.token).toBe('access-token');
    expect(result.current.refreshToken).toBe('refresh-token');
  });

  it('removes tokens', () => {
    const {result} = renderHook(() => useUserStore());

    act(() => {
      result.current.setToken('access-token', 'refresh-token');
      result.current.removeToken();
    });

    expect(result.current.token).toBeNull();
    expect(result.current.refreshToken).toBeNull();
  });

  it('persists tokens to localStorage', async () => {
    const {result} = renderHook(() => useUserStore());

    act(() => {
      result.current.setToken('access-token', 'refresh-token');
    });

    await new Promise((resolve) => setTimeout(resolve, 10));

    const stored = localStorage.getItem('token');
    expect(stored).toBeTruthy();

    const parsed = JSON.parse(stored!);
    expect(parsed.state.token).toBe('access-token');
    expect(parsed.state.refreshToken).toBe('refresh-token');
  });
});
