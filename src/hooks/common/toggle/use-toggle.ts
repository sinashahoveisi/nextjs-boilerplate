import {useCallback, useState} from 'react';
import type {IUseToggle} from './use-toggle.type';

/**
 * Custom React hook for toggling boolean state.
 *
 * @typedef {Object} IUseToggle - Object containing toggle state and functions to manipulate it.
 * @property {boolean} isOn - Current state of the toggle.
 * @property {function} reset - Function to reset the toggle state to its default value.
 * @property {function} setOn - Function to set the toggle state to true.
 * @property {function} setOff - Function to set the toggle state to false.
 * @property {function} toggle - Function to toggle the current state of the toggle.
 *
 * @param {boolean} [defaultValue=false] - The default value for the toggle state.
 * @returns {IUseToggle} - Object containing toggle state and functions to manipulate it.
 *
 * @example
 * // Example usage of useToggle hook
 * const { isOn, toggle } = useToggle();
 *
 * return (
 *     <div>
 *         <button onClick={toggle}>Toggle</button>
 *         <p>{isOn ? 'ON' : 'OFF'}</p>
 *     </div>
 * );
 */
export function useToggle(defaultValue: boolean = false): IUseToggle {
  const [isOn, set] = useState<boolean>(defaultValue);
  const reset = useCallback(() => set(defaultValue), [defaultValue]);
  const setOn = useCallback(() => set(true), []);
  const setOff = useCallback(() => set(false), []);
  const toggle = useCallback(() => set((prevState: boolean) => !prevState), []);

  return {isOn, reset, setOn, setOff, toggle, set};
}
