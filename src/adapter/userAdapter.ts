import axios from 'axios';
import { AccountModel, UserModel } from '../util/systemConfig';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-type': 'application/json',
  },
});

export const getLoggedInUser = async (): Promise<UserModel | null> => {
  try {
    const res = await api.get('prev-login/');
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
    await api.post('register/', user);
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

export const updateLoginStatus = async (email: string, user: {}) => {
  try {
    await api.put(`update-user/${email}/`, user);
  } catch (err) {
    console.log(err);
  }
};

export const login = async (username: string, password: string) => {
  try {
    const res = await api.post('login/', {
      username: username,
      password: password,
    });
    const foundUser = await getUser(username, password);
    const accounts = await getLinkedAccounts(username);

    if (!foundUser || !accounts) return null;

    const newUser: UserModel = {
      ...foundUser,
      accounts: accounts,
    };

    localStorage.setItem('token', res.data.token);
    return newUser;
  } catch (err) {
    console.log('dumbass');
  }
};

export const validateSession = async () => {
  const token = localStorage.getItem('token');
  const authApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  try {
    const res = await authApi.get('validate/');
    return res.data;
  } catch (err) {
    console.log('dumbaass');
    return false;
  }
};

export const updateAccount = async (account: AccountModel) => {
  try {
    const res = await api.put(
      `update-account/${account.accountNumber}/`,
      account
    );

    return res.data;
  } catch (err) {
    return null;
  }
};
