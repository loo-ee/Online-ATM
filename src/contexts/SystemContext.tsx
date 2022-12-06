import React, { useState } from 'react';
import { BankModel } from '../util/systemConfig';

interface Prop {
  children: React.ReactNode;
}

export interface SystemContextProp {
  bankSelected: BankModel;
  setBankSelected: React.Dispatch<React.SetStateAction<BankModel>>;
  isBankSelected: boolean;
  setIsBankSelected: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [bankSelected, setBankSelected] = useState<BankModel>(bank);

  const [isBankSelected, setIsBankSelected] = useState(false);

  const System: SystemContextProp = {
    bankSelected: bankSelected,
    setBankSelected: setBankSelected,
    isBankSelected: isBankSelected,
    setIsBankSelected: setIsBankSelected,
  };

  return (
    <SystemContext.Provider value={System}>{children}</SystemContext.Provider>
  );
};

export default SystemContextProvider;
