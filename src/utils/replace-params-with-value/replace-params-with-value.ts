export const replaceParamsWithValue = (str: string, params?: object): string => {
  if (!params) return str;
  Object.entries(params).forEach(([key, value]: [string, string | number]) => {
    str = str.replaceAll(`{${key}}`, String(value));
  });
  return str;
};
