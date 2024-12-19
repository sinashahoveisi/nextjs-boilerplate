import {toast} from 'react-toastify';
import {ResponseStatusCode} from '@/types/response-status';
import type {AxiosError} from 'axios';
import type {ResponseErrorType} from 'types/response';
import type {IUseApiError} from './use-api-error.type';

export const useApiError = ({toastError = true}: IUseApiError = {}) => {
  const handleRequestError = (failureCount: number, error: AxiosError<ResponseErrorType>): boolean => {
    let errorMessage = error?.response?.data?.message;
    if (error.response?.status === ResponseStatusCode?.BadRequest && !errorMessage)
      errorMessage = 'در اعتبارسنجی مشکلی رخ داده است';

    if (toastError) toast.error(errorMessage);
    if (
      error.response?.status === ResponseStatusCode.NotFound ||
      error.response?.status === ResponseStatusCode.InternalServerError ||
      error.response?.status === ResponseStatusCode?.BadRequest
    )
      return false;
    return failureCount <= 1;
  };

  return {handleRequestError};
};
