import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { AccountModel, BankModel } from '../../../util/systemConfig';

interface Prop {}

const Info: React.FC<Prop> = ({}) => {
  const User = useContext(UserContext);
  const BDOAccountsCount = useRef(0);
  const BPIAccountsCount = useRef(0);
  const LBAccountsCount = useRef(0);

  const getAccountsCount = () => {
    User?.user.accounts.map((account) => {
      switch (account.bank) {
        case 'BDO':
          BDOAccountsCount.current++;
          break;

        case 'BPI':
          BPIAccountsCount.current++;
          break;

        case 'LANDBANK':
          LBAccountsCount.current++;
          break;
      }
    });
  };

  useEffect(() => {
    getAccountsCount();
  }, []);

  return (
    <div className="laptop:p-3">
      <div className="flex flex-col bg-primary laptop:p-4 rounded">
        <span className="text-3xl text-white">{User?.user.username}</span>
        <span className="text-md text-gray-200">{User?.user.email}</span>
      </div>

      <div className="text-xs flex flex-col text-start text-white laptop:mt-2">
        <div className="bg-blue-900 p-2 rounded mt-2">
          You have {BDOAccountsCount.current} BDO accounts.
        </div>
        <div className="bg-red-900 p-2 rounded mt-2">
          You have {BPIAccountsCount.current} BPI accounts.
        </div>
        <div className="bg-green-700 p-2 rounded mt-2">
          You have {LBAccountsCount.current} LANDBANK accounts.
        </div>
      </div>
    </div>
  );
};

export default Info;
