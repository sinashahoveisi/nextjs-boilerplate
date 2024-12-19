import {useEffect, useState} from 'react';
import type {AxiosError, AxiosRequestConfig} from 'axios';
import {useQuery} from '@tanstack/react-query';
import {SERVER} from 'libs/Axios';
import {replaceParamsWithValue} from 'utils/replace-params-with-value';
import {urlGenerator} from 'utils/url-generator';
import {handleRequestError} from 'utils/handle-request-error';
import {type ResponseErrorType} from 'types/response';
import type {QueryRequestBaseType, QueryRequestType} from 'types/request';
import type {
  IUseQueryFnData,
  IUseQueryFactoryResult,
  IUseQueryFactoryProps,
  IUseQueryProps,
  QueryKeyType
} from './use-query-factory.type';

/**
 * Custom React Query hook for handling data fetching with additional features.
 *
 * @template Response - The type of the raw response data.
 * @template SelectResponse - The type of the selected response data.
 *
 * @typedef {Object} QueryKeyType - Type definition for the query key used in React Query.
 * @type {ReadonlyArray<string | number>}
 *
 * @typedef {Object} IUseQueryFnData - Type definition for the data returned by the fetch function.
 * @property {ResponseSuccess<Response, null>} data - The raw response data.
 *
 * @typedef {Object} IUseQueryFactoryProps - Props for the useQueryFactory hook.
 * @property {string} url - The base URL for the API request.
 * @property {QueryKeyType} queryKey - The query key used in React Query.
 * @property {object} [query] - Additional query parameters.
 *   These are included in the URL as query parameters.
 * @property {object} [params] - Complete object for constructing the URL.
 *   For example, if the URL is "/post/{id}" and params: { id: 5 }, the URL becomes "/post/5".
 * @property {number} [version] - API version.
 * @property {boolean} [showError=true] - Flag to show or hide errors.
 * @property {function(data: IUseQueryFnData<Response>): IUseQueryFnData<SelectResponse>} [select] - Data selection function.
 *   Conditional property based on the relationship between Response and SelectResponse.
 *   If defined, this function is called to transform the raw response data into a customized
 *   SelectResponse format. The function receives an object with a 'data' property representing
 *   the raw response data, and it should return an object with the transformed or selected data.
 *   This property is optional and is only needed when SelectResponse is different from Response.
 *   The returned type must match IUseQueryFnData<SelectResponse>.
 * @property {object} [anotherConfigs] - Additional configurations for the underlying useQuery hook.
 *   These configurations are spread/rest parameters and allow users to customize the behavior
 *   of the useQuery hook without explicitly defining them in IUseQueryFactoryProps.
 *   Refer to the useQuery documentation for available configuration options.
 *
 * @typedef {Object} IUseQueryProps - Props for the useQueryFactory result.
 * @property {IUseQueryFnData<Response>} data - The selected response data.
 * @property {AxiosError<ResponseErrorType>} error - The error object, if any.
 * @property {boolean} isLoading - Flag indicating whether the data is loading.
 * @property {boolean} isSuccess - Flag indicating whether the data fetching was successful.
 * @property {boolean} isError - Flag indicating whether an error occurred during data fetching.
 *
 * @typedef {Object} IUseQueryFactoryResult - Result of the useQueryFactory hook.
 * @property {function(variables: QueryRequestType): void} fetch - Function to trigger a refetch with new parameters.
 * @property {object} query - The combined query parameters used in the API request.
 * @property {object} params - The combined params used in the API request.
 *
 * @param {IUseQueryFactoryProps<Response, SelectResponse>} props - Hook configuration.
 * @throws {Error} If there is an issue with the API request.
 * @returns {IUseQueryFactoryResult<SelectResponse>} - Result object containing data and additional features.
 * @example
 * // Example usage of useQueryFactory hook
 * const queryResult = useQueryFactory({
 *    url: '/api/data/{lang}',
 *    queryKey: ['data'],
 *    version: 1,
 *    query: { category: 'example' },
 *    params: { lang: 'en' },
 *    showError: true,
 *    select: (data) => ({ data: { modifiedData: data.dataSubset }, success: true }),
 * });
 */
export const useQueryFactory = <Response, SelectResponse = Response>({
  url,
  queryKey,
  query,
  params,
  version,
  method = 'GET',
  showError = true,
  staleTime = 120000,
  gcTime = 180000,
  ...anotherConfigs
}: IUseQueryFactoryProps<Response, SelectResponse>): IUseQueryFactoryResult<SelectResponse> => {
  const [dynamicParams, setDynamicParams] = useState<QueryRequestBaseType | undefined>(undefined);

  const allQueryParams = Object.assign({}, query, dynamicParams?.queryParams);
  const allParams = Object.assign({}, params, dynamicParams?.params);

  if (!queryKey.length) {
    staleTime = 0;
    gcTime = 0;
  }

  const requestConfig: AxiosRequestConfig = {
    headers: {
      silent: !showError
    },
    url: replaceParamsWithValue(urlGenerator(url, version), allParams),
    method,
    params: allQueryParams,
    data: allQueryParams
  };

  const fetchData: IUseQueryProps<SelectResponse> = useQuery<
    IUseQueryFnData<Response>,
    AxiosError<ResponseErrorType>,
    IUseQueryFnData<SelectResponse>,
    QueryKeyType
  >({
    queryKey,
    queryFn: async () => {
      const fetch = await SERVER<IUseQueryFnData<Response>>(requestConfig);
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
      fetchData.refetch();
    }
  }, [dynamicParams]);

  const fetch = (variables: QueryRequestType) => {
    setDynamicParams(variables);
  };

  return {
    ...fetchData,
    fetch,
    query: allQueryParams,
    params: allParams
  };
};
