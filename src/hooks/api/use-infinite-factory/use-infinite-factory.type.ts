import type {InfiniteData, UseInfiniteQueryOptions, UseInfiniteQueryResult} from '@tanstack/react-query';
import type {ResponseErrorType, ResponseSuccess} from 'types/response';
import type {QueryRequestType} from 'types/request';
import type {AxiosError, Method} from 'axios';

export type QueryKeyType = ReadonlyArray<string | number>;
export type IUseInfiniteFnData<Response> = ResponseSuccess<Response, 'pagination'>;

export type IUseInfiniteFactoryProps<Response, SelectResponse = Response> = Omit<
  UseInfiniteQueryOptions<
    IUseInfiniteFnData<Response>,
    AxiosError<ResponseErrorType>,
    InfiniteData<IUseInfiniteFnData<SelectResponse>>,
    QueryKeyType,
    number
  >,
  'getNextPageParam' | 'getPreviousPageParam' | 'initialPageParam'
> & {
  url: string;
  queryKey: QueryKeyType;
  query?: object;
  params?: object;
  search?: object;
  version?: number;
  method?: Method;
  perPage?: number;
} & (SelectResponse extends Response
    ? {select?: never}
    : {
        select: (data: IUseInfiniteFnData<Response>) => IUseInfiniteFnData<SelectResponse>;
      });

export type IUseInfiniteProps<Response> = UseInfiniteQueryResult<
  InfiniteData<IUseInfiniteFnData<Response>>,
  AxiosError<ResponseErrorType>
>;

export type IUseQueryFactoryResult<Response> = IUseInfiniteProps<Response> & {
  fetch(variables: QueryRequestType): void;
  dataPages: Array<Response>;
};
