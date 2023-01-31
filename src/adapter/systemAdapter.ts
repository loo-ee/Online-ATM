import axios from 'axios';
import { BankModel, backendUrl } from '../util/systemConfig';

const api = axios.create({
  baseURL: backendUrl,
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
