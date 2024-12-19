import type {UseQueryResult, UseQueryOptions} from '@tanstack/react-query';
import type {ResponseErrorType, ResponseSuccess} from 'types/response';
import type {QueryRequestType} from 'types/request';
import type {AxiosError, Method} from 'axios';

export type QueryKeyType = ReadonlyArray<string | number>;
export type IUseQueryFnData<Response> = ResponseSuccess<Response, null>;

export type IUseQueryFactoryProps<Response, SelectResponse = Response> = UseQueryOptions<
  IUseQueryFnData<Response>,
  AxiosError<ResponseErrorType>,
  IUseQueryFnData<SelectResponse>,
  QueryKeyType
> & {
  url: string;
  queryKey: QueryKeyType;
  query?: object;
  params?: object;
  version?: number;
  method?: Method;
  showError?: boolean;
};

export type IUseQueryProps<Response> = UseQueryResult<IUseQueryFnData<Response>, AxiosError<ResponseErrorType>>;

export type IUseQueryFactoryResult<Response> = IUseQueryProps<Response> & {
  fetch(variables: QueryRequestType): void;
  query: Object;
  params: Object;
};
