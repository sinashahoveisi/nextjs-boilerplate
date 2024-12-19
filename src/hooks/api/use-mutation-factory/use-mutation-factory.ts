import {QueryFilters, useMutation, useQueryClient} from '@tanstack/react-query';
import useAxios from 'hooks/api/use-axios/use-axios';
import {toast} from 'react-toastify';
import {useApiError} from 'hooks/error/use-api-error';
import {replaceParamsWithValue} from 'utils/replace-params-with-value';
import {urlGenerator} from 'utils/url-generator';
import {type ResponseErrorType} from 'types/response';
import type {AxiosError, AxiosRequestConfig} from 'axios';
import type {MutationRequestType} from 'types/request';
import type {
  IUseMutateFnData,
  IUseMutationFactoryProps,
  IUseMutationFactoryResult,
  IUseMutationProps
} from './use-mutation-factory.type';

/**
 * Custom React Query hook for handling mutations with additional features.
 *
 * @template Response - The type of the raw response data.
 *
 * @typedef {Object} IUseMutateFnData - Type definition for the data returned by the mutation function.
 * @property {ResponseSuccess<Response, null>} data - The raw response data.
 *
 * @typedef {Object} IUseMutationFactoryProps - Props for the useMutationFactory hook.
 * @property {string} url - The base URL for the API request.
 * @property {object} [query] - Additional query parameters.
 *   These are included in the URL as query parameters.
 * @property {number} [version] - API version.
 * @property {Method} [method='POST'] - HTTP method for the mutation.
 * @property {Array<QueryFilters>} [removeQueries] - Array of query filters to remove from the query cache on success.
 * @property {Array<QueryFilters>} [refetchQueries] - Array of query filters to refetch in the query cache on success.
 * @property {string} [successMessage=''] - Success message for the mutation.
 * @property {boolean} [isMultipart=false] - Flag indicating whether the request is a multipart form-data request.
 * @property {boolean} [isUrlencoded=false] - Flag indicating whether the request is an x-www-form-urlencoded request.
 * @property {boolean} [showError=true] - Flag to show or hide errors.
 * @property {function(data: IUseMutateFnData<Response>): void} [onSuccess] - Callback function called on successful mutation.
 * @property {function(error: AxiosError<ResponseErrorType>, variables?: MutationRequestType, context?: unknown): void} [onError] - Callback function called on error during mutation.
 * @property {object} [anotherConfigs] - Additional configurations for the underlying useMutation hook.
 *   These configurations are spread/rest parameters and allow users to customize the behavior
 *   of the useMutation hook without explicitly defining them in IUseMutationFactoryProps.
 *   Refer to the useMutation documentation for available configuration options.
 *
 * @typedef {Object} IUseMutationProps - Props for the useMutationFactory result.
 * @property {IUseMutateFnData<Response>} data - The selected response data.
 * @property {AxiosError<ResponseErrorType>} error - The error object, if any.
 * @property {boolean} isLoading - Flag indicating whether the mutation is in progress.
 * @property {boolean} isSuccess - Flag indicating whether the mutation was successful.
 * @property {boolean} isError - Flag indicating whether an error occurred during the mutation.
 * @property {MutationRequestType | undefined} variables - The variables used for the mutation.
 * @property {function(variables?: MutationRequestType): Promise<void>} mutate - Function to trigger the mutation with new variables.
 *
 * @typedef {Object} IUseMutationFactoryResult - Result of the useMutationFactory hook.
 * @property {function(): void} retry - Function to retry the mutation with the original variables.
 *   This is useful in scenarios where you want to trigger the mutation again with the same parameters.
 *
 * @param {IUseMutationFactoryProps<Response>} props - Hook configuration.
 * @throws {Error} If there is an issue with the API request.
 * @returns {IUseMutationFactoryResult<Response>} - Result object containing mutation data and additional features.
 * @example
 * // Example usage of useMutationFactory hook
 * const mutationResult = useMutationFactory({
 *    url: '/api/data',
 *    method: 'POST',
 *    query: { category: 'example' },
 *    version: 1,
 *    successMessage: 'Data successfully updated!',
 *    removeQueries: [{ queryKey: ['data'] }],
 *    refetchQueries: [{ queryKey: ['data'], variables: { page: 1 } }],
 *    onSuccess: (data) => console.log('Mutation successful!', data),
 *    onError: (error) => console.error('Mutation error:', error),
 * });
 */
export const useMutationFactory = <Response>({
  url,
  method = 'POST',
  query,
  version,
  isMultipart = false,
  isUrlencoded = false,
  successToast = true,
  toastError = true,
  removeQueries = [],
  refetchQueries = [],
  onSuccess,
  onError,
  ...anotherConfigs
}: IUseMutationFactoryProps<Response>): IUseMutationFactoryResult<Response> => {
  const queryClient = useQueryClient();
  const axios = useAxios();
  const {handleRequestError} = useApiError({toastError});

  const requestConfig: AxiosRequestConfig = {
    headers: {
      'Content-type': isMultipart
        ? 'multipart/form-data'
        : isUrlencoded
          ? 'application/x-www-form-urlencoded'
          : 'application/json'
    },

    url: urlGenerator(url, version),
    method,
    params: query
  };

  const mutationFn = async ({body, queryParams, params}: MutationRequestType = {}) => {
    if (queryParams) requestConfig.params = Object.assign({}, query, queryParams);
    if (params) requestConfig.url = replaceParamsWithValue(urlGenerator(url, version), params);
    requestConfig.data = body;
    const fetch = await axios<IUseMutateFnData<Response>>(requestConfig);
    return fetch?.data || fetch;
  };

  const mutationData: IUseMutationProps<Response> = useMutation<
    IUseMutateFnData<Response>,
    AxiosError<ResponseErrorType>,
    MutationRequestType | undefined
  >({
    mutationFn,
    retry: false,
    ...anotherConfigs,
    onSuccess: (data: IUseMutateFnData<Response>, variables?: MutationRequestType, context?: unknown) => {
      removeQueries?.forEach((removeQuery: QueryFilters) => queryClient.removeQueries(removeQuery));
      refetchQueries?.forEach((refetchQuery: QueryFilters) => queryClient.refetchQueries(refetchQuery));
      if (!!successToast) {
        toast.success(typeof successToast === 'string' ? successToast : 'با موفقیت انجام شد.');
      }
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError: (error: AxiosError<ResponseErrorType>, variables?: MutationRequestType, context?: unknown) => {
      handleRequestError(0, error);
      if (onError) {
        onError(error, variables, context);
      }
    }
  });

  const retry = () => mutationData?.mutate(mutationData?.variables);

  return {
    ...mutationData,
    retry
  };
};
