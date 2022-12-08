export const baseUrl = '/Online-ATM/';

export type BankModel = {
  bankName: string;
  description: string;
  thumbnail: string;
};

export type UserModel = {
  email: string;
  password: string;
  accounts: AccountModel[];
  avatar: string | null;
  lastLogin: string | null;
  isLoggedIn: boolean;
  username: string;
  isAdmin: boolean;
};

export type AccountModel = {
  bank: string;
  name: string;
  accountNumber: number;
  pin: number;
  balance: number;
};

export const banks: BankModel[] = [
  {
    bankName: 'BPI',
    description: 'Love the life you live.',
    thumbnail: 'bpi.jpg',
  },
  {
    bankName: 'BDO',
    description: 'We find ways.',
    thumbnail: 'bdo.png',
  },
  {
    bankName: 'Landbank',
    description:
      'We develop and nurture talents who exemplify the highest standards of ethics, social responsibility and service excellence.',
    thumbnail: 'landbank.svg',
  },
];
