import React, { useState } from 'react';
import { AccountRequest } from '../util/systemConfig';

interface Prop {
  children: React.ReactNode;
}

export interface AdminContextProp {
  requests: AccountRequest[];
  setRequests: React.Dispatch<React.SetStateAction<AccountRequest[]>>;
}

export const AdminContext = React.createContext<AdminContextProp | null>(null);

const AdminContextProvider: React.FC<Prop> = ({ children }) => {
  const [requests, setRequests] = useState<AccountRequest[]>([]);

  const Admin: AdminContextProp = {
    requests: requests,
    setRequests: setRequests,
  };

  return (
    <AdminContext.Provider value={Admin}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
