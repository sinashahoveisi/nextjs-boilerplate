import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {throttle} from './throttle';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls the function immediately on first invocation', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('does not call again within the limit window', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled();
    throttled();

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('calls again after the limit has passed', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    vi.advanceTimersByTime(100);
    throttled();
    vi.runOnlyPendingTimers();

    expect(func).toHaveBeenCalledTimes(2);
  });
});
