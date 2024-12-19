'use client';

import {useRouter} from 'next/navigation';
import {SERVER} from 'libs/Axios';
import {useUserStore} from '@/stores/user';
import {useQueryClient} from '@tanstack/react-query';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {PAGE_ROUTES} from '@/configs/page-routes';
import {ResponseStatusCode} from '@/types/response-status';
import type {AxiosRequestConfig} from 'axios';

const useAxios = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const refreshToken = useUserStore((state) => state.refreshToken);
  const removeToken = useUserStore((state) => state.removeToken);
  const setToken = useUserStore((state) => state.setToken);

  const refreshAuthLogic = (failedRequest: any) => {
    if (!refreshToken) {
      removeToken();
      return Promise.resolve();
    }

    const requestConfig: AxiosRequestConfig = {
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      timeout: 15000,
      url: 'auth/refresh',
      method: 'POST',
      headers: {silent: true},
      data: {refreshToken}
    };

    return SERVER(requestConfig)
      .then((tokenRefreshResponse: any) => {
        setToken(tokenRefreshResponse?.token, tokenRefreshResponse?.refreshToken);
        failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse?.token}`;
        return Promise.resolve();
      })
      .catch(() => {
        removeToken();
        router.replace(PAGE_ROUTES.LOGIN);
        queryClient.removeQueries();
      });
  };

  createAuthRefreshInterceptor(SERVER, refreshAuthLogic, {statusCodes: [ResponseStatusCode.Unauthorized]});

  return SERVER;
};

export default useAxios;
