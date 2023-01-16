import axios from 'axios';
import { BankModel } from '../util/systemConfig';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-type': 'application/json',
  },
});

export const getBanks = async (): Promise<BankModel[] | null> => {
  try {
    const res = await api.get('banks/');
    return res.data;
  } catch (err) {
    return null;
  }
};
