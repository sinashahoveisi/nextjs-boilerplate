import {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import type {AxiosError, AxiosRequestConfig} from 'axios';
import {SERVER} from 'libs/Axios';
import {replaceParamsWithValue} from 'utils/replace-params-with-value';
import {urlGenerator} from 'utils/url-generator';
import {handleRequestError} from 'utils/handle-request-error';
import type {ResponseErrorType, ResponseType} from 'types/response';
import type {QueryRequestType} from 'types/request';
import type {
  IUsePaginationFactoryProps,
  IUsePaginationFactoryResult,
  IUsePaginationFnData,
  IUsePaginationProps,
  QueryKeyType
} from './use-pagination-factory.type';

/**
 * Custom React Query hook for paginated data fetching with additional features.
 *
 * @template Response - The type of the raw response data.
 * @template SelectResponse - The type of the selected response data.
 *
 * @typedef {Object} QueryKeyType - Type definition for the query key used in React Query.
 * @type {ReadonlyArray<string | number>}
 *
 * @typedef {Object} IUsePaginationFnData - Type definition for the data returned by the fetch function.
 * @property {Response | null} data - The raw response data.
 *
 * @typedef {Object} IUsePaginationFactoryProps - Props for the usePaginationFactory hook.
 * @property {string} url - The base URL for the API request.
 * @property {QueryKeyType} queryKey - The query key used in React Query.
 * @property {object} [query] - Additional query parameters.
 *   These are included in the URL as query parameters, e.g., /add/update?id=5.
 * @property {object} [search] - Search parameters for filtering or searching data.
 *   Unlike 'query' parameters, these are not cached for a long time and are often used for short-term filtering.
 * @property {object} [params] - Complete object for constructing the URL.
 *   For example, if the URL is "/post/{id}" and params: { id: 5 }, the URL becomes "/post/5".
 * @property {number} version - API version.
 * @property {number} page - Current page number.
 * @property {number} [perPage=10] - Number of items per page.
 * @property {boolean} [showError=true] - Flag to show or hide errors.
 * @property {number} [staleTime=180000] - Stale time for caching in React Query.
 * @property {number} [gcTime=600000] - Garbage collection time in React Query.
 * @property {function(data: IUsePaginationFnData<Response>): IUsePaginationFnData<SelectResponse>} [select] - Data selection function.
 *   Conditional property based on the relationship between Response and SelectResponse.
 *   If defined, this function is called to transform the raw response data into a customized
 *   SelectResponse format. The function receives an object with a 'data' property representing
 *   the raw response data, and it should return an object with the transformed or selected data.
 *   This property is optional and is only needed when SelectResponse is different from Response.
 *   The returned type must match IUsePaginationFnData<SelectResponse>.
 * @property {object} [anotherConfigs] - Additional configurations for the underlying useQuery hook.
 *   These configurations are spread/rest parameters and allow users to customize the behavior
 *   of the useQuery hook without explicitly defining them in IUsePaginationFactoryProps.
 *   Refer to the useQuery documentation for available configuration options.
 *
 * @typedef {Object} IUsePaginationProps - Props for the usePaginationFactory result.
 * @property {IUsePaginationFnData<Response>} data - The selected response data.
 * @property {AxiosError<ResponseErrorType>} error - The error object, if any.
 * @property {boolean} isLoading - Flag indicating whether the data is loading.
 * @property {boolean} isSuccess - Flag indicating whether the data fetching was successful.
 * @property {boolean} isError - Flag indicating whether an error occurred during data fetching.
 *
 * @typedef {Object} IUsePaginationFactoryResult - Result of the usePaginationFactory hook.
 * @property {function(variables: QueryRequestType): void} fetch - Function to trigger a refetch with new parameters.
 * @property {object} queryParams - Merged query parameters.
 * @property {object} params - Merged request parameters.
 * @property {IUsePaginationProps<SelectResponse>} ... - Other props from usePaginationFactory result.
 *
 * @param {IUsePaginationFactoryProps<Response, SelectResponse>} props - Hook configuration.
 * @throws {Error} If there is an issue with the API request.
 * @returns {IUsePaginationFactoryResult<SelectResponse>} - Result object containing paginated data and additional features.
 * @example
 * // Example usage of usePaginationFactory hook
 * const paginationResult = usePaginationFactory({
 *    url: '/api/data/{lang}',
 *    queryKey: ['data'],
 *    page: 1,
 *    perPage: 10,
 *    version: 1,
 *    search: { keyword: 'example' },
 *    query: { category: 'example' },
 *    params: { lang: 'en' },
 *    showError: true,
 *    staleTime: 300000,
 *    gcTime: 600000,
 *    select: (data) => ({ data: { modifiedData: data.dataSubset }, success: true }),
 * });
 *
 * TODO: fix select for when map another type.
 */
export const usePaginationFactory = <Response, SelectResponse = Response, AdditionalResponse = {}>({
  url,
  method = 'GET',
  queryKey,
  query,
  search,
  params,
  version,
  page,
  perPage = 10,
  showError = true,
  staleTime = 180000,
  gcTime = 600000,
  ...anotherConfigs
}: IUsePaginationFactoryProps<Response, SelectResponse, AdditionalResponse>): IUsePaginationFactoryResult<
  SelectResponse,
  AdditionalResponse
> => {
  const [dynamicParams, setDynamicParams] = useState<QueryRequestType | undefined>(undefined);
  const allSearchParams = Object.assign({}, search, dynamicParams?.search);
  const allQueryParams = Object.assign({}, query, dynamicParams?.queryParams);
  const allParams = Object.assign({}, params, dynamicParams?.params);

  if (!queryKey || !!Object.keys(allSearchParams).length) {
    queryKey = [...queryKey, 'search'];
    staleTime = 0;
    gcTime = 0;
  }

  const requestConfig: AxiosRequestConfig = {
    headers: {
      silent: !showError
    },
    url: replaceParamsWithValue(urlGenerator(url, version), Object.assign({}, params, dynamicParams?.params)),
    method,
    data: method != 'GET' ? allSearchParams : undefined,
    params: Object.assign({}, allQueryParams, allSearchParams, {
      PageNumber: page,
      PageSize: perPage
    })
  };

  const paginateQuery: IUsePaginationProps<SelectResponse, AdditionalResponse> = useQuery<
    ResponseType<Response>,
    AxiosError<ResponseErrorType>,
    IUsePaginationFnData<SelectResponse, AdditionalResponse>,
    QueryKeyType
  >({
    queryKey: [...queryKey, perPage, page],
    queryFn: async () => {
      const fetch = await SERVER<ResponseType<Response>>(requestConfig);
      return fetch.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    staleTime,
    gcTime,
    retryDelay: 5000,
    retry: handleRequestError,
    ...anotherConfigs
  });

  useEffect(() => {
    if (dynamicParams && !!Object.values(dynamicParams).length) {
      paginateQuery.refetch();
    }
  }, [dynamicParams]);

  const fetch = (variables: QueryRequestType) => {
    setDynamicParams(variables);
  };

  return {
    ...paginateQuery,
    fetch,
    queryParams: allQueryParams,
    params: allParams,
    search: allSearchParams
  };
};
