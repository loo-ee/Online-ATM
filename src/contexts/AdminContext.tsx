import React, { useState } from 'react';
import { AccountRequest, ChangePinRequest } from '../util/systemConfig';

interface Prop {
  children: React.ReactNode;
}

export interface AdminContextProp {
  accountCreationRequests: AccountRequest[];
  setAccountCreationRequests: React.Dispatch<
    React.SetStateAction<AccountRequest[]>
  >;
  changePinRequests: ChangePinRequest[];
  setChangePinRequests: React.Dispatch<
    React.SetStateAction<ChangePinRequest[]>
  >;
}

export const AdminContext = React.createContext<AdminContextProp | null>(null);

const AdminContextProvider: React.FC<Prop> = ({ children }) => {
  const [accountCreationRequests, setAccountCreationRequests] = useState<
    AccountRequest[]
  >([]);
  const [changePinRequests, setChangePinRequests] = useState<
    ChangePinRequest[]
  >([]);

  const Admin: AdminContextProp = {
    accountCreationRequests: accountCreationRequests,
    setAccountCreationRequests: setAccountCreationRequests,
    changePinRequests: changePinRequests,
    setChangePinRequests: setChangePinRequests,
  };

  return (
    <AdminContext.Provider value={Admin}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
