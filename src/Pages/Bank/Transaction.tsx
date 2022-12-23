import { useContext, useRef, useState } from 'react';
import {
  createMessage,
  findAccount,
  updateAccount,
} from '../../adapter/userAdapter';
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
  const [isReadyForTransfer, setIsReadyForTransfer] = useState(false);
  const messageField = useRef<HTMLInputElement>(null);

  const bgColor = {
    BDO: 'bg-blue-900',
    BPI: 'bg-red-900',
  };

  const withdraw = async (deduction: number) => {
    account.balance -= deduction;
    await updateAccount(account);
  };

  const validateAccount = async (accountNumber: number) => {
    const foundAccount: AccountModel = await findAccount(accountNumber);

    if (!foundAccount) {
      console.log('Account to receive not found');
      return;
    }

    if (foundAccount.bank != account.bank) {
      console.log('Different banks, not authorized to transfer');
      return;
    }

    setAccountToReceive(foundAccount);
    setIsAccountFound(true);
  };

  const prepareToSendMoney = async (amount: number) => {
    if (!accountToReceive) return;

    setAmountToTransfer(amount);
    accountToReceive.balance += amount;
    setIsReadyForTransfer(true);
  };

  const sendMoney = async () => {
    if (!accountToReceive || !messageField.current) return;

    const messageBody = messageField.current.value;
    const sender = account.accountNumber;
    const receiver = accountToReceive.accountNumber;
    const title = 'Received Credit';

    await updateAccount(accountToReceive);
    await withdraw(amountToTransfer);
    await createMessage({
      sender: sender.toString(),
      receiver: receiver.toString(),
      title: title,
      body: messageBody,
    });

    console.log('Transfer success');
    setIsReadyForTransfer(false);
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
            {isReadyForTransfer && (
              <div
                className={
                  'absolute text-white phone:w-[150px] tablet:w-[210px] laptop:w-[300px] p-5 rounded-md self-center flex flex-col items-center ' +
                  bgColor[account.bank as keyof typeof bgColor]
                }
              >
                <span className="phone:mb-3 laptop:mb-7 phone:text-md tablet:text-xl laptop:text-3xl">
                  Enter message
                </span>
                <input
                  ref={messageField}
                  type="text"
                  placeholder="Enter message"
                  className="phone:p-2 tablet:p-3 rounded phone:w-[110px] tablet:w-[180px] laptop:w-[240px] phone:text-xs tablet:text-md laptop:text-xl text-black"
                />

                <div className="flex flex-row laptop:justify-evenly phone:justify-between w-full">
                  <button
                    className="bg-green-500 phone:p-1 laptop:p-3 rounded mt-5 phone:w-14 tablet:w-28 laptop:w-36 text-white phone:text-sm laptop:text-xl"
                    onClick={sendMoney}
                  >
                    Send
                  </button>

                  <button
                    className="bg-red-500 phone:p-2 laptop:p-3 rounded phone:w-10 tablet:w-12 laptop:w-20 mt-5 text-white text-xl phone:text-sm laptop:text-xl"
                    onClick={() => setIsReadyForTransfer(false)}
                  >
                    X
                  </button>
                </div>
              </div>
            )}

            <BankPageHeader headerText="Input amount" />
            <NumPad mainOperation={prepareToSendMoney} />
          </>
        ) : (
          <>
            <BankPageHeader headerText="Find account number" />
            <NumPad mainOperation={validateAccount} />
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
