import type {UseQueryOptions, UseQueryResult} from '@tanstack/react-query';
import type {ResponseErrorType, ResponseSuccess, ResponseType} from 'types/response';
import type {QueryRequestType} from 'types/request';
import type {AxiosError, Method} from 'axios';

export type QueryKeyType = ReadonlyArray<string | number>;
export type IUsePaginationFnData<Response, AdditionalResponse> = ResponseSuccess<
  Response,
  'pagination',
  AdditionalResponse
>;

export type IUsePaginationFactoryProps<Response, SelectResponse = Response, AdditionalResponse = {}> = UseQueryOptions<
  ResponseType<Response>,
  AxiosError<ResponseErrorType>,
  IUsePaginationFnData<SelectResponse, AdditionalResponse>,
  QueryKeyType
> & {
  url: string;
  method?: Method;
  queryKey: QueryKeyType;
  query?: object;
  search?: object;
  params?: object;
  version?: number;
  page: number;
  perPage?: number;
  showError?: boolean;
} & (SelectResponse extends Response
    ? {select?: never}
    : {
        select: (
          data: IUsePaginationFnData<Response, AdditionalResponse>
        ) => IUsePaginationFnData<SelectResponse, AdditionalResponse>;
      });

export type IUsePaginationProps<Response, AdditionalResponse = {}> = UseQueryResult<
  IUsePaginationFnData<Response, AdditionalResponse>,
  AxiosError<ResponseErrorType>
>;

export type IUsePaginationFactoryResult<Response, AdditionalResponse> = IUsePaginationProps<
  Response,
  AdditionalResponse
> & {
  fetch(variables: QueryRequestType): void;
  queryParams: Record<string, any>;
  params: Record<string, any>;
  search: Record<string, any>;
};
