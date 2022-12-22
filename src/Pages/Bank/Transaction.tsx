import { useContext, useState } from 'react';
import { updateAccount } from '../../adapter/userAdapter';
import { SystemContext } from '../../contexts/SystemContext';
import { UserContext } from '../../contexts/UserContext';
import NumPad from '../../util/NumPad';
import { AccountModel } from '../../util/systemConfig';
import BankPageHeader from './BankgPageHeader';
import PasswordChange from './PasswordChange';

interface Prop {
  account: AccountModel;
}

const Transaction: React.FC<Prop> = ({ account }) => {
  const System = useContext(SystemContext);
  const User = useContext(UserContext);

  const [finalAmount, setFinalAmount] = useState(0);
  const [isAccountFound, setIsAccountFound] = useState(false);
  const [amountToTransfer, setAmountToTransfer] = useState(0);
  const [accountToFind, setAccountToFind] = useState(0);
  const [willSendMoney, setWillSendMoney] = useState(false);
  const [accountToReceive, setAccountToReceive] = useState<AccountModel | null>(
    null
  );

  const withdraw = (deduction: number) => {
    account.balance -= deduction;
    updateAccount(account);
  };

  if (System?.transactionMode == 'withdraw') {
    return (
      <div className="flex flex-col items-center">
        <BankPageHeader headerText="Input amount to withdraw" />
        <NumPad mainOperation={withdraw} />
      </div>
    );
  } else if (System?.transactionMode == 'balance') {
    return (
      <div className="flex flex-col bg-white rounded-lg phone:w-32 phone:h-16 laptop:w-60 laptop:h-28 items-start p-4 mt-9 justify-evenly">
        <div className="phone:text-lg laptop:text-2xl text-u_darkblue">
          Balance
        </div>
        <div className="phone:text-md laptop:text-xl">
          <span className="text-u_orange">$</span>
          {account.balance}
        </div>
      </div>
    );
  } else if (System?.transactionMode == 'transfer') {
    if (willSendMoney) {
      return (
        <div>
          <BankPageHeader headerText="Sending money..." />

          <div className="h-32 flex flex-col justify-evenly items-center">
            <span>Amount: ${amountToTransfer}</span>
            <span>Sender: {account.accountNumber}</span>
            <span>Reciever: {accountToReceive?.accountNumber}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        {isAccountFound ? (
          <>
            <BankPageHeader headerText="Input amount" />
            <NumPad mainOperation={setAmountToTransfer} />
          </>
        ) : (
          <>
            <BankPageHeader headerText="Find account number" />
            <NumPad mainOperation={setAccountToFind} />
          </>
        )}
      </div>
    );
  } else if (System?.transactionMode == 'pin') {
    return <PasswordChange account={account} />;
  } else {
    return <div>Please select a mode</div>;
  }
};

export default Transaction;
