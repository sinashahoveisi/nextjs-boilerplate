import {describe, it, expect} from 'vitest';
import {renderHook, act} from '@testing-library/react';
import {useToggle} from './use-toggle';

describe('useToggle', () => {
  it('initializes with default value (false)', () => {
    const {result} = renderHook(() => useToggle());
    expect(result.current.isOn).toBe(false);
  });

  it('initializes with a custom default value', () => {
    const {result} = renderHook(() => useToggle(true));
    expect(result.current.isOn).toBe(true);
  });

  it('toggles state', () => {
    const {result} = renderHook(() => useToggle(false));

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOn).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOn).toBe(false);
  });

  it('sets on and off', () => {
    const {result} = renderHook(() => useToggle(false));

    act(() => {
      result.current.setOn();
    });
    expect(result.current.isOn).toBe(true);

    act(() => {
      result.current.setOff();
    });
    expect(result.current.isOn).toBe(false);
  });

  it('resets to the default value', () => {
    const {result} = renderHook(() => useToggle(false));

    act(() => {
      result.current.setOn();
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.isOn).toBe(false);
  });
});
