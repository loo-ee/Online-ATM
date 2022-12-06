import axios from 'axios';
import { AccountModel, BankModel, UserModel } from '../util/systemConfig';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-type': 'application/json',
  },
});

export const getLoggedInUser = async (): Promise<UserModel | null> => {
  try {
    const res = await api.get('prev-login');
    return res.data;
  } catch (err) {
    return null;
  }
};

export const getUser = async (
  email: string,
  password: string
): Promise<UserModel | null> => {
  try {
    const res = await api.get(`users/`, {
      params: {
        email: email,
        password: password,
      },
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

export const searchUserEmail = async (email: string) => {
  try {
    await api.get(`search-user/`, {
      params: {
        email: email,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const createUser = async (user: {}) => {
  try {
    await api.post('create-user/', user);
  } catch (err) {
    return;
  }
};

export const getLinkedAccounts = async (
  email: string
): Promise<AccountModel[]> => {
  try {
    const res = await api.get('accounts/', {
      params: {
        email: email,
      },
    });

    return res.data;
  } catch (err) {
    return [];
  }
};
