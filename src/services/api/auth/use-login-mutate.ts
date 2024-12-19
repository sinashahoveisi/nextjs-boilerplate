import {API_ROUTES} from 'configs/api-routes';
import {useMutationFactory} from 'hooks/api/use-mutation-factory';
import type {IUseMutationFactoryProps} from 'hooks/api/use-mutation-factory/use-mutation-factory.type';
import type {IAuthentication} from 'types/auth';

export const useLoginMutate = (
  options?: Pick<IUseMutationFactoryProps<IAuthentication>, 'refetchQueries' | 'onSuccess'>
) => {
  return useMutationFactory<IAuthentication>({
    url: API_ROUTES.AUTH_LOGIN,
    method: 'POST',
    ...options
  });
};
