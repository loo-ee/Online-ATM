import React, { useRef, useState } from 'react';
import { AccountModel, UserModel } from '../util/systemConfig';

interface Prop {
  children: React.ReactNode;
}

export interface UserContextProp {
  user: UserModel;
  setUser: React.Dispatch<React.SetStateAction<UserModel>>;
  isAdmin: React.MutableRefObject<boolean>;
}

export const UserContext = React.createContext<UserContextProp | null>(null);

const UserContextProvider: React.FC<Prop> = ({ children }) => {
  const userAcc: UserModel = {
    username: '???',
    password: '???',
    email: '???',
    avatar: null,
    lastLogin: null,
    isAdmin: false,
    accounts: [],
  };

  const [userAccount, setUserAccount] = useState<UserModel>(userAcc);

  const isAdmin = useRef(false);

  const User: UserContextProp = {
    user: userAccount,
    setUser: setUserAccount,
    isAdmin: isAdmin,
  };

  return <UserContext.Provider value={User}>{children}</UserContext.Provider>;
};

export const nullAccount: AccountModel = {
  name: '???',
  pin: -1,
  balance: -1,
  bank: '???',
  accountNumber: -1,
};

export default UserContextProvider;
