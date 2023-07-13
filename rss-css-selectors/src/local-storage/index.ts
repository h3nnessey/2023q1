import { LOCAL_STORAGE_PREFIX } from '../constants';

export const setLocalStorage = <T>(obj: T): void => {
  localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify(obj));
};

export const getLocalStorage = <T>(): T | null => {
  const json = localStorage.getItem(LOCAL_STORAGE_PREFIX);
  return json ? JSON.parse(json) : null;
};
