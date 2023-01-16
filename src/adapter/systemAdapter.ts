import axios from 'axios';
import { BankModel } from '../util/systemConfig';

const api = axios.create({
  baseURL: 'http://43.206.230.229/',
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
