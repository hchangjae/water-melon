import { makeApiPathWithPathValues, makeApiPathWithQuery } from '@/utils/apiPathUtils';
import { ApiFn, Method } from '@/utils/apiTypeUtils';
import { login, logout } from '@/utils/authUtils';
import { isClient } from '@/utils/deviceUtils';
import axios, { AxiosResponse } from 'axios';

const API_TIMEOUT = 10000;

const instance = axios.create({
  timeout: API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Fetcher
 */
export const apiGet: ApiFn<Method.Get> = (_url, params, options = {}) => {
  const url = makeApiPathWithPathValues(_url, options.paths);
  const uri = makeApiPathWithQuery(url, params);
  return callApi(() => instance.get(uri, options));
};

export const apiPost: ApiFn<Method.Post> = (_url, params, options = {}) => {
  const uri = makeApiPathWithPathValues(_url, options.paths);
  return callApi(() => instance.post(uri, params, options ?? {}));
};

export const apiPut: ApiFn<Method.Put> = (_url, params, options = {}) => {
  const uri = makeApiPathWithPathValues(_url, options.paths);
  return callApi(() => instance.put(uri, params, options));
};

export const apiPatch: ApiFn<Method.Patch> = (_url, params, options = {}) => {
  const uri = makeApiPathWithPathValues(_url, options.paths);
  return callApi(() => instance.patch(uri, params, options));
};

export const apiDelete: ApiFn<Method.Delete> = (_url, params, options = {}) => {
  const url = makeApiPathWithPathValues(_url, options.paths);
  const uri = makeApiPathWithQuery(url, params);
  return callApi(() => instance.delete(uri, options));
};

/**
 * Response Handler
 */
const callApi = async <T = unknown>(api: () => Promise<AxiosResponse<T>>) => {
  try {
    const r = await api();

    return Promise.resolve(r.data);
  } catch (e: any) {
    if (!isClient) {
      console.log('An server side error occurred', e);
      return Promise.reject(e);
    }

    const status = e?.response?.status;

    switch (status) {
      case 401:
        await login(window.location.pathname);
      case 403:
        await logout();
        await login(window.location.pathname, true);
        break;
    }

    return Promise.reject(e);
  }
};
