import {ReactQueryProvider} from 'providers/react-query';
import {ToastProvider} from '@/providers/toast';
import {TopLoaderProvider} from '@/providers/top-loader';
import type {IMainProviderProps as Props} from './main-provider.type';

export const MainProvider: React.FC<Props> = ({children}) => {
  return (
    <>
      <ReactQueryProvider>{children}</ReactQueryProvider>
      <TopLoaderProvider />
      <ToastProvider />
    </>
  );
};
