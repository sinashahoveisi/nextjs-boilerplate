import React, {forwardRef} from 'react';
import clsx from 'clsx';
import {Skeleton} from 'components/loading/skeleton';
import {ErrorMessage} from '../error-message';
import type {ITextInput} from './text-input.type';

export const TextInput = forwardRef<HTMLInputElement, ITextInput>(
  (
    {
      name,
      label,
      type,
      className,
      containerClassName,
      inputClassName,
      rightClassName = '',
      leftClassName = '',
      disabled,
      error,
      loading,
      leftElement,
      rightElement,
      required,
      showErrorMessage = true,
      ...props
    },
    ref
  ) => {
    return (
      <div className={clsx('w-full flex flex-col items-start', containerClassName)}>
        {label && (
          <label
            htmlFor={name}
            className={clsx('text-xs font-medium md:text-sm mb-1', {
              'after:mr-1 after:text-red-600 after:content-["*"]': required
            })}>
            {label}
          </label>
        )}
        {loading ? (
          <Skeleton className='mt-1 w-full py-6' />
        ) : (
          <>
            <div
              className={clsx(
                'relative w-full flex items-center border rounded-xl px-2 overflow-hidden bg-white dark:bg-design-gray',
                {
                  'bg-zinc-200 opacity-50': disabled,
                  'border-red-400': error?.message,
                  'focus-within:border-blue-500': !error?.message // Focus border color
                },
                inputClassName
              )}>
              {leftElement && (
                <span className={clsx('inline-flex items-center', {'text-rose-400': error?.message}, leftClassName)}>
                  {leftElement}
                </span>
              )}
              <input
                {...props}
                ref={ref}
                name={name}
                disabled={disabled}
                type={type}
                step={type === 'number' ? 'any' : undefined}
                className={clsx(
                  'text-sm md:text-md w-full px-2 py-2.5 text-left bg-transparent focus:outline-none',
                  {
                    'cursor-not-allowed bg-gray-200': disabled
                  },
                  className
                )}
              />
              {rightElement && (
                <span className={clsx('inline-flex items-center', {'text-rose-400': error?.message}, rightClassName)}>
                  {rightElement}
                </span>
              )}
            </div>
            {showErrorMessage && <ErrorMessage text={error?.message} />}
          </>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
