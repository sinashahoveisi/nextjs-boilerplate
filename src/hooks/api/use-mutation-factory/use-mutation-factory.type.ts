import type {AxiosError, Method} from 'axios';
import type {QueryFilters, UseMutationOptions, UseMutationResult} from '@tanstack/react-query';
import type {ResponseErrorType, ResponseSuccess} from 'types/response';
import type {MutationRequestType} from 'types/request';

export type IUseMutateFnData<Response> = ResponseSuccess<Response, null>;

export type IUseMutateShowErrorFn = (
  error: AxiosError<ResponseErrorType, any>,
  variables: MutationRequestType | undefined,
  context: unknown
) => boolean;

export interface IUseMutationFactoryProps<Response> extends UseMutationOptions<
  IUseMutateFnData<Response>,
  AxiosError<ResponseErrorType>,
  MutationRequestType | undefined
> {
  url: string;
  query?: object;
  version?: number;
  method?: Method;
  removeQueries?: Array<QueryFilters>;
  refetchQueries?: Array<QueryFilters>;
  successToast?: boolean | string;
  isMultipart?: boolean;
  isUrlencoded?: boolean;
  toastError?: boolean;
}

export type IUseMutationProps<Response> = UseMutationResult<
  IUseMutateFnData<Response>,
  AxiosError<ResponseErrorType>,
  MutationRequestType | undefined
>;

export type IUseMutationFactoryResult<Response> = IUseMutationProps<Response> & {
  retry(): void;
};
