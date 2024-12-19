import {API_ROUTES} from 'configs/api-routes';
import {useMutationFactory} from 'hooks/api/use-mutation-factory';
import type {IUseMutationFactoryProps} from 'hooks/api/use-mutation-factory/use-mutation-factory.type';

export const useLogoutMutate = (
  options?: Pick<IUseMutationFactoryProps<any>, 'refetchQueries' | 'onSuccess' | 'onError'>
) => {
  return useMutationFactory({
    url: API_ROUTES.AUTH_LOGOUT,
    method: 'POST',
    ...options
  });
};
