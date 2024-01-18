import { Params } from '@/utils/apiTypeUtils';

export const makeApiPathWithPathValues = <T>(path: string, pathValues?: T) => {
  if (!pathValues) return path;

  let result = path;
  for (const key in pathValues) {
    const regExp = new RegExp(`\\[${key}\\]`);
    result = result.replace(regExp, encodeURIComponent(pathValues[key] as string));
  }
  return result;
};

export const makeApiPathWithQuery = (path: string, query?: Params) => {
  return query ? `${path}${path.indexOf('?') === -1 ? '?' : '&'}${makeQueryString(query)}` : path;
};

export const makeQueryString = (params: Params) => {
  // 스트링 변환 후 첫번째 &를 삭제
  return Object.entries(params)
    .reduce((acc, e) => `${acc}&${e[0]}=${e[1]}`, '')
    .slice(1);
};
