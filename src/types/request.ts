export type MutationRequestType = {
  body?: any;
  queryParams?: Record<string, any>;
  params?: Record<string, any>;
};

export type QueryRequestBaseType = {
  queryParams?: object;
  params?: object;
};

export type QueryRequestType = QueryRequestBaseType & {
  search?: object;
};
