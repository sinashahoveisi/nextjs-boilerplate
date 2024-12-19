'use client';

import clsx from 'clsx';
import type {IFallback} from './fallback.type';

export const Fallback: React.FC<IFallback> = ({title, description, className}) => {
  return (
    <div className={clsx('flex flex-col items-center space-y-1 my-auto', className)}>
      <span className='font-bold text-2xl text-gray-500'>{title || ''}</span>
      <p className='font-semibold text-sm text-gray-400'>{description || ''}</p>
    </div>
  );
};
