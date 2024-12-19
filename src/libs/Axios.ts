import axios, {AxiosResponse} from 'axios';
import {getFromStorage} from 'utils/storage';

export const SERVER = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 30000
});

SERVER.interceptors.request.use(
  (request) => {
    const tokenStore = getFromStorage('token');
    const token = tokenStore?.state?.token;
    if (!!token) request.headers.authorization = `Bearer ${token}`;

    return request;
  },
  (error) => error
);

SERVER.interceptors.response.use((response: AxiosResponse) => {
  return response?.data;
});
