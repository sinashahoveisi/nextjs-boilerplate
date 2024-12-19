import {API_ROUTES} from 'configs/api-routes';
import {useQueryFactory} from 'hooks/api/use-query-factory';
import {API_QUERY_KEY} from '@/configs/api-query-key';
import type {IUseQueryFactoryProps} from '@/hooks/api/use-query-factory/use-query-factory.type';
import type {IUserInfo} from '@/types/user';

export const useUserInfoFetch = (options?: Pick<IUseQueryFactoryProps<IUserInfo>, 'enabled'>) => {
  return useQueryFactory<IUserInfo>({
    queryKey: API_QUERY_KEY.USER_INFO,
    url: API_ROUTES.USER_INFO,
    ...options
  });
};
