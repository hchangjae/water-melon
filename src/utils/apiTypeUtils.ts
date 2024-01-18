import { GetAdminUserRequest, GetAdminUserResponse } from '@/pages/api/admin/user.page';
import { GetUserMeRequest, GetUserMeResponse, PostUserMeRequest, PostUserMeResponse } from '@/pages/api/user/me.page';
import { AxiosRequestConfig } from 'axios';

/**
 * Common
 *
 */
type UnionRecord<T extends string, U, Item = unknown> = T extends U ? Record<T, Item> : never;
export type Params = Record<string, unknown>;

/**
 * Type Definitions
 *
 */
export const enum Method {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

type ApiInterface = {
  '/api/user/me': {
    [Method.Get]: { request: GetUserMeRequest; response: GetUserMeResponse };
    [Method.Post]: { request: PostUserMeRequest; response: PostUserMeResponse };
  };
  '/api/admin/user': {
    [Method.Get]: { request: GetAdminUserRequest; response: GetAdminUserResponse };
  };
};

/**
 * Type Usage
 *
 */
export type Path<M extends Method> = keyof ApiInterface extends infer P
  ? P extends keyof ApiInterface
    ? ApiInterface extends UnionRecord<P, keyof ApiInterface, infer K>
      ? K extends Record<M, unknown>
        ? P
        : never
      : never
    : never
  : never;

export type Response<P extends Path<M>, M extends Method> = ApiInterface[P] extends UnionRecord<M, Method, infer T> ? (T extends { response: infer R } ? R : never) : never;

export type RequestBody<P extends Path<M>, M extends Method> = ApiInterface[P] extends UnionRecord<M, Method, infer T>
  ? T extends { request: { body?: infer R } }
    ? R
    : never
  : never;

export type RequestQuery<P extends Path<M>, M extends Method> = ApiInterface[P] extends UnionRecord<M, Method, infer T>
  ? T extends { request: { query?: infer R } }
    ? R
    : never
  : never;

export type RequestPaths<P extends Path<M>, M extends Method> = ApiInterface[P] extends UnionRecord<M, Method, infer T>
  ? T extends { request: { paths?: infer R } }
    ? R
    : never
  : never;

type UseBody<M extends Method> = M extends Method.Post | Method.Put | Method.Patch ? M : 'X';

export type ApiFn<M extends Method> = <P extends Path<M>>(
  path: P,
  params?: UseBody<M> extends M ? RequestBody<P, M> : RequestQuery<P, M>,
  options?: AxiosRequestConfig & { paths?: RequestPaths<P, M> }
) => Promise<Response<P, M>>;
