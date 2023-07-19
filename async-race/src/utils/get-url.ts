import { BASE_URL } from '../constants';
import { ServiceOptions } from '../types';

export const getUrl = (path = '', params?: [ServiceOptions, string][]): URL => {
  const url = new URL(`${BASE_URL}${path}`);

  if (params) {
    params.forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  return url;
};
