import axios from 'axios';
import {
  AccountModel,
  AccountRequest,
  ChangePinRequest,
  MessageModel,
  UserModel,
} from '../util/systemConfig';

const api = axios.create({
  baseURL: 'https://online-atm-backend.onrender.com/',
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
    return null;
  }
};

export const validateSession = async () => {
  const token = localStorage.getItem('token');
  const authApi = axios.create({
    baseURL: 'https://online-atm-backend.onrender.com/',
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

export const findAccount = async (accountNumber: number) => {
  try {
    const res = await api.get(`account/${accountNumber}/`);
    return res.data;
  } catch (error) {
    return false;
  }
};

export const createAccountCreationRequest = async (request: AccountRequest) => {
  try {
    await api.post('create-account-req/', request);
    return true;
  } catch (error) {
    return null;
  }
};

export const createChangePinRequest = async (request: ChangePinRequest) => {
  try {
    const res = await api.post('create-change-pin-request/', request);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createMessage = async (message: MessageModel) => {
  try {
    const res = await api.post('create-message/', message);

    return res.status;
  } catch (error) {
    return null;
  }
};

export const getMessages = async (receiver: string) => {
  try {
    const res = await api.get(`messages/${receiver}/`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAccount = async (accountNumber: number) => {
  try {
    const res = await api.get(`account/${accountNumber}/`);
    return res.data;
  } catch (error) {
    return null;
  }
};
