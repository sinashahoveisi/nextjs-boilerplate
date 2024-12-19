import {API_ROUTES} from 'configs/api-routes';
import {useQueryFactory} from 'hooks/api/use-query-factory';
import {API_QUERY_KEY} from '@/configs/api-query-key';
import type {IUseQueryFactoryProps} from '@/hooks/api/use-query-factory/use-query-factory.type';
import type {IUserOrder} from '@/types/user';

export const useUserOrdersFetch = (options?: Pick<IUseQueryFactoryProps<IUserOrder>, 'enabled'>) => {
  return useQueryFactory<IUserOrder>({
    queryKey: API_QUERY_KEY.USER_ORDERS,
    url: API_ROUTES.USER_ORDERS,
    method: 'POST',
    ...options
  });
};
