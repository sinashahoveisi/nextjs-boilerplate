'use client';

import dynamic from 'next/dynamic';
import {QueryClientProvider} from '@tanstack/react-query';
import {reactQueryConfig} from './config/react-query.config';
import {IReactQueryProviderProps as Props} from './react-query-provider.type';

const ReactQueryDevtools = dynamic(() => import('@tanstack/react-query-devtools').then((d) => d.ReactQueryDevtools));

export const ReactQueryProvider: React.FC<Props> = ({children}) => {
  return (
    <QueryClientProvider client={reactQueryConfig}>
      {children}
      {process.env.NODE_ENV === 'development' && !process.env.STORYBOOK && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
      )}
    </QueryClientProvider>
  );
};
