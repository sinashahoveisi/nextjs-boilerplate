import {useEffect, useState} from 'react';
import {InfiniteData, useInfiniteQuery} from '@tanstack/react-query';
import {SERVER} from 'libs/Axios';
import {replaceParamsWithValue} from 'utils/replace-params-with-value';
import {urlGenerator} from 'utils/url-generator';
import {handleRequestError} from 'utils/handle-request-error';
import type {AxiosError, AxiosRequestConfig} from 'axios';
import type {ResponseErrorType} from 'types/response';
import type {QueryRequestType} from 'types/request';
import type {
  IUseInfiniteFactoryProps,
  IUseInfiniteFnData,
  IUseInfiniteProps,
  IUseQueryFactoryResult,
  QueryKeyType
} from './use-infinite-factory.type';

/**
 * Custom React Query hook for infinite paginated data fetching with additional features.
 *
 * @template Response - The type of the raw response data.
 * @template SelectResponse - The type of the selected response data.
 *
 * @typedef {Object} QueryKeyType - Type definition for the query key used in React Query.
 * @type {ReadonlyArray<string | number>}
 *
 * @typedef {Object} IUseInfiniteFnData - Type definition for the data returned by the fetch function.
 * @property {ResponsePaginationType<Response>} data - The raw response data.
 *
 * @typedef {Object} IUseInfiniteFactoryProps - Props for the useInfiniteFactory hook.
 * @property {string} url - The base URL for the API request.
 * @property {QueryKeyType} queryKey - The query key used in React Query.
 * @property {object} [query] - Additional query parameters.
 *   These are included in the URL as query parameters, e.g., /add/update?id=5.
 * @property {object} [search] - Search parameters for filtering or searching data.
 *   Unlike 'query' parameters, these are not cached for a long time and are often used for short-term filtering.
 * @property {object} [params] - Complete object for constructing the URL.
 *   For example, if the URL is "/post/{id}" and params: { id: 5 }, the URL becomes "/post/5".
 * @property {number} version - API version.
 * @property {number} [staleTime=180000] - Stale time for caching in React Query.
 * @property {number} [gcTime=600000] - Garbage collection time in React Query.
 * @property {function(data: IUseInfiniteFnData<Response>): IUseInfiniteFnData<SelectResponse>} [select] - Data selection function.
 *   Conditional property based on the relationship between Response and SelectResponse.
 *   If defined, this function is called to transform the raw response data into a customized
 *   SelectResponse format. The function receives an object with a 'data' property representing
 *   the raw response data, and it should return an object with the transformed or selected data.
 *   This property is optional and is only needed when SelectResponse is different from Response.
 *   The returned type must match IUseInfiniteFnData<SelectResponse>.
 * @property {object} [anotherConfigs] - Additional configurations for the underlying useInfiniteQuery hook.
 *   These configurations are spread/rest parameters and allow users to customize the behavior
 *   of the useInfiniteQuery hook without explicitly defining them in IUseInfiniteFactoryProps.
 *   Refer to the useInfiniteQuery documentation for available configuration options.
 *
 * @typedef {Object} IUseInfiniteProps - Props for the useInfiniteFactory result.
 * @property {InfiniteData<IUseInfiniteFnData<Response>>} data - The selected response data.
 * @property {AxiosError<ResponseErrorType>} error - The error object, if any.
 * @property {boolean} isLoading - Flag indicating whether the data is loading.
 * @property {boolean} isSuccess - Flag indicating whether the data fetching was successful.
 * @property {boolean} isError - Flag indicating whether an error occurred during data fetching.
 *
 * @typedef {Object} IUseQueryFactoryResult - Result of the useInfiniteFactory hook.
 * @property {function(variables: QueryRequestType): void} fetch - Function to trigger a refetch with new parameters.
 * @property {IUseInfiniteFnData<SelectResponse>[]} dataPages - Array containing pages of selected response data.
 *   Each page is an object with the transformed or selected data.
 *   This property is useful for scenarios where you want to access data from multiple pages.
 *
 * @param {IUseInfiniteFactoryProps<Response, SelectResponse>} props - Hook configuration.
 * @throws {Error} If there is an issue with the API request.
 * @returns {IUseQueryFactoryResult<SelectResponse>} - Result object containing paginated data and additional features.
 * @example
 * // Example usage of useInfiniteFactory hook
 * const infiniteResult = useInfiniteFactory({
 *    url: '/api/data/{lang}',
 *    queryKey: ['data'],
 *    version: 1,
 *    search: { keyword: 'example' },
 *    query: { category: 'example' },
 *    params: { lang: 'en' },
 *    staleTime: 300000,
 *    gcTime: 600000,
 *    select: (data) => ({ data: { modifiedData: data.dataSubset }, success: true }),
 * });
 */
export const useInfiniteFactory = <Response, SelectResponse = Response>({
  url,
  queryKey,
  query,
  search,
  params,
  version,
  method = 'GET',
  perPage = 10,
  staleTime = 180000,
  gcTime = 600000,
  ...anotherConfigs
}: IUseInfiniteFactoryProps<Response, SelectResponse>): IUseQueryFactoryResult<SelectResponse> => {
  const [dynamicParams, setDynamicParams] = useState<QueryRequestType | undefined>(undefined);

  const allSearchParams = Object.assign({}, search, dynamicParams?.search);
  const allQueryParams = Object.assign({}, query, dynamicParams?.queryParams);
  const allParams = Object.assign({}, params, dynamicParams?.params);

  if (!queryKey.length || !!Object.keys(allSearchParams).length) {
    queryKey = [...queryKey, 'search'];
    staleTime = 0;
    gcTime = 0;
  }

  const requestConfig: AxiosRequestConfig = {
    url: replaceParamsWithValue(urlGenerator(url, version), allParams),
    method
  };

  const queryFn: any = async ({pageParam = 1}) => {
    requestConfig.params = Object.assign(
      {},
      {PageNumber: pageParam, PageSize: perPage},
      allQueryParams,
      allSearchParams
    );
    requestConfig.data = Object.assign({}, {PageNumber: pageParam, PageSize: perPage}, allQueryParams, allSearchParams);
    const fetch = await SERVER<IUseInfiniteFnData<Response>>(requestConfig);
    return fetch.data;
  };

  const infiniteQuery: IUseInfiniteProps<SelectResponse> = useInfiniteQuery<
    IUseInfiniteFnData<Response>,
    AxiosError<ResponseErrorType>,
    InfiniteData<IUseInfiniteFnData<SelectResponse>>,
    QueryKeyType
  >({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    staleTime,
    gcTime,
    retryDelay: 5000,
    retry: handleRequestError,
    ...anotherConfigs,
    initialPageParam: 1,
    getPreviousPageParam: (lastPage: IUseInfiniteFnData<Response>) => {
      if (lastPage?.current > 1) return lastPage?.current - 1;
      return null;
    },
    getNextPageParam: (lastPage: IUseInfiniteFnData<Response>, pages) => {
      const currentPage = pages?.length || 0;
      const currentCount = currentPage * lastPage?.pageSize;
      if (currentCount < lastPage?.totalCount) return currentPage + 1;
      return null;
    }
  });

  const dataPages: Array<SelectResponse> =
    infiniteQuery.data?.pages?.reduce(
      (allData: Array<SelectResponse>, pageData: IUseInfiniteFnData<SelectResponse>) => [
        ...allData,
        ...pageData?.items
      ],
      []
    ) || [];

  useEffect(() => {
    if (dynamicParams && !!Object.values(dynamicParams).length) {
      infiniteQuery.refetch();
    }
  }, [dynamicParams]);

  const fetch = (variables: QueryRequestType) => {
    setDynamicParams(variables);
  };

  return {
    ...infiniteQuery,
    fetch,
    dataPages
  };
};
