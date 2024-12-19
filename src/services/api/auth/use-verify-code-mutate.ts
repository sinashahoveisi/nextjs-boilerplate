import {API_ROUTES} from 'configs/api-routes';
import {useMutationFactory} from 'hooks/api/use-mutation-factory';
import type {IUseMutationFactoryProps} from 'hooks/api/use-mutation-factory/use-mutation-factory.type';

export const useVerifyCodeMutate = (options?: Pick<IUseMutationFactoryProps<{}>, 'onSuccess'>) => {
  return useMutationFactory({
    url: API_ROUTES.AUTH_VERIFY_CODE,
    method: 'POST',
    ...options
  });
};
