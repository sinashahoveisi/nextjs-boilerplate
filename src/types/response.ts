export type ResponseErrorType = {
  message: string;
  success: false;
  data: null;
};

export type ResponseVariantType = 'pagination';

export type ResponsePaginationType<T> = {
  items: T[];
  current: number;
  pages: number;
  remaining: number;
  total: number;
};

export type ResponseSuccess<T, A extends ResponseVariantType | null, D = {}> = {
  messageCode: number;
  data: A extends 'pagination' ? ResponsePaginationType<T> & D : T;
} & any;

export type ResponseType<T, A extends ResponseVariantType | null = null> = ResponseErrorType | ResponseSuccess<T, A>;
