import {useQueryClient} from '@tanstack/react-query';
import {useUserStore} from '@/stores/user';
import {useUserInfoFetch} from '@/services/api/user/use-user-info-fetch';
import type {IUseUser} from './use-user.type';

export function useUser(): IUseUser {
  const queryClient = useQueryClient();
  const token = useUserStore((state) => state.token);
  const setToken = useUserStore((state) => state.setToken);
  const removeToken = useUserStore((state) => state.removeToken);
  const fetchUserInfo = useUserInfoFetch({enabled: !!token});

  const isMySelf = (id?: number | string) => {
    if (!id) return false;
    return fetchUserInfo?.data?.id === +id;
  };

  const logout = () => {
    removeToken();
    queryClient.removeQueries();
  };

  const isLogin: boolean = !!token && (!fetchUserInfo?.isFetched || !!fetchUserInfo?.data);

  return {
    data: fetchUserInfo?.data,
    isMySelf,
    isLogin,
    token,
    login: setToken,
    logout
  };
}
