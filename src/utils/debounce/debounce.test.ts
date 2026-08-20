import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {debounce} from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls the function after the delay', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('only calls the function once if called multiple times within delay', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('calls the function with correct arguments', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc('arg1', 'arg2', 123);
    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledWith('arg1', 'arg2', 123);
  });

  it('resets the timer on each call', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    vi.advanceTimersByTime(50);
    debouncedFunc();
    vi.advanceTimersByTime(50);

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(func).toHaveBeenCalledTimes(1);
  });
});
