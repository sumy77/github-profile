import { UserObj } from '../models/types';

const storage = localStorage;

const getItem = (key: string): UserObj[] => {
  const result: string | null = localStorage.getItem(key);
  if (result) {
    return JSON.parse(result);
  }
  return [];
};

const setItem = (key: string, value: UserObj[]) => {
  storage.setItem(key, JSON.stringify(value));
};

const removeItem = (key: string) => {
  storage.removeItem(key);
};

export { getItem, setItem, removeItem };
