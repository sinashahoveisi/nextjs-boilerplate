import {cloneElement} from 'react';
import {Controller} from 'react-hook-form';
import {pipe} from 'utils/pipe';
import type {IControlProps as Props} from './control.type';

/**
 * A functional component designed to control form inputs seamlessly within the context of the react-hook-form library.
 * This component enhances the capabilities of form input elements by providing control features such as value transformation and error handling.
 * @param {Object} props - The props object containing various configurations for controlling the input.
 * @param {Function} props.transform - An optional transformation function that modifies the input value before it's processed further.
 * @param {React.ReactElement} props.children - The child component to be controlled by this ControlComponent. Typically, this is an input element like <input />, <textarea />, etc.
 * @param {Object} props.otherProps - Additional props to be passed down to the controlled input element.
 * @returns {React.ReactElement} - Returns a React element representing the controlled input with enhanced features.
 * @example
 * // Example Usage with Manual Control:
 * return (
 *     <ControlComponent
 *         transform={(value) => value.toUpperCase()} // Example transformation function (optional)
 *         onChange={(value) => console.log('Value changed:', value)} // Example onChange handler (optional)
 *         value={someValue} // Example value (optional)
 *         error={someError} // Example error message (optional)
 *     >
 *         <input type="text" placeholder="Enter value" /> // Example input component
 *     </ControlComponent>
 * );
 *
 * // Example Usage with react-hook-form Control:
 * import { useForm, Controller } from 'react-hook-form';
 *
 * const { control } = useForm();
 *
 * return (
 *     <ControlComponent
 *         name="description"
 *         control={control}
 *         transform={(value) => value.toUpperCase()} // Example transformation function (optional)
 *     >
 *         <input type="text" placeholder="Enter description" /> // Example input component
 *     </ControlComponent>
 * );
 */
export const Control: React.FC<Props> = ({transform, valueKey = 'value', children, ...props}) => {
  if ('onChange' in props && !!props['onChange']) {
    // If `onChange` exists in props, control the input manually
    return cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      [valueKey]: props?.value,
      onChange: transform && props?.onChange ? pipe(transform, props?.onChange) : props?.onChange,
      error: props?.error
    });
  } else if ('control' in props && !!props['control']) {
    // If `control` exists in props, control the input with react-hook-form
    return (
      <Controller
        {...props}
        render={({field: {onChange, value}, fieldState: {error}}) =>
          cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            name: props.name,
            [valueKey]: value,
            onChange: transform ? pipe(transform, onChange) : onChange,
            error: error
          })
        }
      />
    );
  } else {
    // Default behavior: return children without any additional control
    return children;
  }
};
