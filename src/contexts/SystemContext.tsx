import React, { useState } from 'react';
import { AccountModel, BankModel } from '../util/systemConfig';

interface Prop {
  children: React.ReactNode;
}

export interface SystemContextProp {
  bankSelected: BankModel;
  setBankSelected: React.Dispatch<React.SetStateAction<BankModel>>;
  isBankSelected: boolean;
  setIsBankSelected: React.Dispatch<React.SetStateAction<boolean>>;
  transactionMode: string;
  setTransactionMode: React.Dispatch<React.SetStateAction<string>>;
  accountSelected: AccountModel;
  setAccountSelected: React.Dispatch<React.SetStateAction<AccountModel>>;
  banks: BankModel[];
  setBanks: React.Dispatch<React.SetStateAction<BankModel[]>>;
}

export const SystemContext = React.createContext<SystemContextProp | null>(
  null
);

const SystemContextProvider: React.FC<Prop> = ({ children }) => {
  const bank: BankModel = {
    bankName: '???',
    description: '???',
    thumbnail: '???',
  };

  const account: AccountModel = {
    bank: '???',
    name: '???',
    accountNumber: -1,
    balance: -1,
    pin: -1,
  };

  const [bankSelected, setBankSelected] = useState<BankModel>(bank);
  const [isBankSelected, setIsBankSelected] = useState(false);
  const [transactionMode, setTransactionMode] = useState('deposit');
  const [accountSelected, setAccountSelected] = useState<AccountModel>(account);
  const [banks, setBanks] = useState([bank, bank]);

  const System: SystemContextProp = {
    bankSelected: bankSelected,
    setBankSelected: setBankSelected,
    isBankSelected: isBankSelected,
    setIsBankSelected: setIsBankSelected,
    transactionMode: transactionMode,
    setTransactionMode: setTransactionMode,
    accountSelected: accountSelected,
    setAccountSelected: setAccountSelected,
    banks: banks,
    setBanks: setBanks,
  };

  return (
    <SystemContext.Provider value={System}>{children}</SystemContext.Provider>
  );
};

export default SystemContextProvider;
