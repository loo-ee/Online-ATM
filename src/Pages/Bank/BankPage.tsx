import { useContext, useState, useEffect } from 'react';
import { SystemContext } from '../../contexts/SystemContext';
import { UserContext, nullAccount } from '../../contexts/UserContext';
import { AccountModel } from '../../util/systemConfig';
import ModeSelection from './ModeSelection';
import Transaction from './Transaction';

interface Prop {}

const BankPage: React.FC<Prop> = ({}) => {
  const System = useContext(SystemContext);
  const User = useContext(UserContext);

  const [mode, setMode] = useState('withdraw');
  const [accountForBank, setAccountForBank] = useState<AccountModel | null>(
    null
  );

  const checkWhichAccount = () => {
    if (!User || !System?.bankSelected) {
      console.log('err');
      return;
    }

    setAccountForBank(nullAccount);

    User.user.accounts.map((account) => {
      if (account.bank == System.bankSelected.bankName) {
        setAccountForBank(account);
        console.log('test');
      } else {
        console.log('none');
      }
    });
  };

  useEffect(() => {
    checkWhichAccount();
  }, []);

  if (!User) {
    return <div>Link Account</div>;
  } else if (System?.bankSelected && User) {
    return (
      <div>
        <div className="phone:mb-2 laptop:mb-9">
          <span className="text-u_darkblue phone:text-lg laptop:text-3xl">
            Connected to {System?.bankSelected.bankName}
          </span>
        </div>

        <div className="bg-white phone:w-[280px] laptop:w-[600px] rounded-lg phone:p-2 laptop:p-6 flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <span className="text-u_darkblue phone:text-md laptop:text-2xl">
              <span className="text-u_orange">Name: </span>
              {accountForBank?.name}
            </span>
            <span className="text-u_darkblue phone:text-sm laptop:text-xl">
              <span className="text-u_orange">Acc #: </span>
              {accountForBank?.accountNumber}
            </span>
          </div>

          <div className="flex flex-row items-center">
            <span className="phone:text-xl laptop:text-5xl">
              {System?.bankSelected.bankName}
            </span>
            <img
              src={
                new URL(
                  `../../assets/images/${System?.bankSelected.thumbnail}`,
                  import.meta.url
                ).href
              }
              className="phone:w-10 phone:h-10 laptop:w-20 laptop:h-20 rounded ml-5"
              alt=""
            />
          </div>
        </div>

        <div className="flex flex-row justify-between mt-10">
          <ModeSelection />
          <Transaction
            account={accountForBank ? accountForBank : nullAccount}
          />
        </div>
      </div>
    );
  } else {
    return <div>Bank not found!</div>;
  }
};

export default BankPage;
