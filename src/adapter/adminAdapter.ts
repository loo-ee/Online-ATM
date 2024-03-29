import axios from 'axios';
import { AccountModel, AccountRequest } from '../util/systemConfig';

const api = axios.create({
  baseURL: 'https://online-atm-backend.onrender.com/',
  headers: {
    'Content-type': 'application/json',
  },
});

export const getAccountRequests = async (): Promise<AccountRequest[]> => {
  try {
    const res = await api.get('account-requests/');
    return res.data;
  } catch (err) {
    return [];
  }
};

export const deleteAccountRequest = async (username: string, bank: string) => {
  try {
    await api.delete('delete-account-req/', {
      data: {
        username: username,
        bank: bank,
      },
    });
  } catch (error) {
    console.log('[Error] Account not deleted');
  }
};

export const deleteChangePinRequest = async (
  accountNumber: number,
  newPin: number
) => {
  try {
    await api.delete('delete-change-pin-req/', {
      data: {
        accountNumber: accountNumber,
        newPin: newPin,
      },
    });
  } catch (error) {
    console.log('[Error] Pin not changed');
  }
};

export const createAccount = async (account: {}) => {
  try {
    await api.post('create-account/', account);
  } catch (error) {
    console.log('[Error] Account not created');
  }
};

export const getPinChangeRequests = async () => {
  try {
    const res = await api.get('change-pin-requests/');
    return res.data;
  } catch (error) {
    return [];
  }
};

export const changeAccountPin = async (account: AccountModel) => {
  try {
    await api.put(`update-account/${account.accountNumber}/`, account);
  } catch (error) {
    return null;
  }
};
