import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findAccount } from '../../adapter/userAdapter';
import { SystemContext } from '../../contexts/SystemContext';
import { AccountModel } from '../../util/systemConfig';

interface Prop {}

const AccountsPanel: React.FC<Prop> = ({}) => {
  const System = useContext(SystemContext);
  const searchBar = useRef<HTMLInputElement>(null);
  const [foundAccount, setFoundAccount] = useState<null | AccountModel>(null);
  const [headerText, setHeaderText] = useState('Search Account');
  const navigator = useNavigate();

  const bgColor = {
    BDO: ' bg-blue-900',
    BPI: ' bg-red-900',
    LANDBANK: ' bg-green-700',
  };

  const fetchAccount = async () => {
    if (!searchBar.current!.value) {
      setHeaderText('Please enter acc #');
      return;
    }

    const account = await findAccount(Number(searchBar.current!.value));

    if (account) {
      setFoundAccount(account);
    }
  };

  const editAccount = () => {
    System?.setAccountSelected(foundAccount);
    navigator('admin/pin-change/');
  };

  return (
    <div className="flex flex-col items-center laptop:w-[350px]">
      <div>
        <span className="laptop:text-2xl font-semibold">{headerText}</span>
      </div>

      <div className="laptop:mt-4">
        <label htmlFor="search"></label>
        <input
          ref={searchBar}
          type="number"
          id="search"
          placeholder="Enter acc #"
          className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
        />
      </div>

      <button
        onClick={fetchAccount}
        className="bg-green-500 laptop:my-3 phone:p-1 laptop:p-3 phone:w-28 laptop:w-36 rounded text-white phone:mt-2 laptop:mt-4"
      >
        Find
      </button>

      {foundAccount && (
        <div
          className={
            'phone:w-[250px] laptop:w-[300px] flex flex-col text-white rounded mt-3 p-4' +
            bgColor[foundAccount.bank as keyof typeof bgColor]
          }
        >
          <div className="flex flex-row justify-between">
            <span className="phone:text-xl laptop:text-2xl">
              {foundAccount.bank}
            </span>
            <span className="phone:text-md laptop:text-xl">
              {foundAccount.accountNumber}
            </span>
          </div>

          <div className="mt-3 flex flex-col">
            <span>Name: {foundAccount.name}</span>
            <span>Balance: {foundAccount.balance}</span>
            <span>Pin: {foundAccount.pin}</span>
          </div>

          <button
            onClick={editAccount}
            className="bg-green-500 self-center laptop:my-3 phone:p-1 laptop:p-3 phone:w-28 laptop:w-36 rounded text-white phone:mt-3 laptop:mt-5"
          >
            Edit Account
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountsPanel;
