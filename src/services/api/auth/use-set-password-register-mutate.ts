import {API_ROUTES} from 'configs/api-routes';
import {useMutationFactory} from 'hooks/api/use-mutation-factory';
import type {IUseMutationFactoryProps} from 'hooks/api/use-mutation-factory/use-mutation-factory.type';

export const useSetPasswordRegisterMutate = (options?: Pick<IUseMutationFactoryProps<{}>, 'onSuccess'>) => {
  return useMutationFactory({
    url: API_ROUTES.AUTH_SET_PASSWORD_REGISTER,
    method: 'POST',
    ...options
  });
};
