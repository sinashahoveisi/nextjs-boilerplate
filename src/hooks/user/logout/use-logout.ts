import {useRouter} from 'next/navigation';
import {useLogoutMutate} from '@/services/api/auth/use-logout-mutate';
import {useUser} from '@/hooks/user/user';
import {PAGE_ROUTES} from '@/configs/page-routes';
import type {IUseLogout} from './use-logout.type';

export function useLogout(): IUseLogout {
  const router = useRouter();
  const user = useUser();
  const onLogoutUser = () => {
    router.replace(PAGE_ROUTES.LOGIN);
    user.logout();
  };
  const logoutMutate = useLogoutMutate({onSuccess: onLogoutUser, onError: onLogoutUser});

  const logout = () => logoutMutate.mutate({});

  return {
    logout
  };
}
