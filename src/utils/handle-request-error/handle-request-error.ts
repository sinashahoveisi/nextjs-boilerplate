import {ResponseStatusCode} from '@/types/response-status';
import type {ResponseErrorType} from '@/types/response';
import type {AxiosError} from 'axios';

export const handleRequestError = (failureCount: number, error: AxiosError<ResponseErrorType>): boolean => {
  if (
    error.response?.status === ResponseStatusCode.NotFound ||
    error.response?.status === ResponseStatusCode.InternalServerError ||
    error.response?.status === ResponseStatusCode.Unauthorized
  )
    return false;
  return failureCount <= 1;
};
