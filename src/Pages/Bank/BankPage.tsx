import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccountCreationRequest } from '../../adapter/userAdapter';
import { SystemContext } from '../../contexts/SystemContext';
import { UserContext, nullAccount } from '../../contexts/UserContext';
import NumPad from '../../util/NumPad';
import { AccountModel, AccountRequest } from '../../util/systemConfig';
import ModeSelection from './ModeSelection';
import Transaction from './Transaction';

interface Prop {}

const BankPage: React.FC<Prop> = ({}) => {
  const System = useContext(SystemContext);
  const User = useContext(UserContext);
  const [arePasswordsMatched, passwordsAreMatched] = useState(false);
  const [headerText, setHeaderText] = useState('Please enter your pin');
  const [wantToCreateAccount, setWantToCreateAccount] = useState(false);
  const [accountForBank, setAccountForBank] = useState<AccountModel | null>(
    null
  );
  const navigator = useNavigate();

  const usernameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);

  const colorScheme = {
    BDO: {
      primaryColor: ' bg-primary',
      secondaryColor: ' bg-blue-600',
    },
    BPI: {
      primaryColor: ' bg-tertiary',
      secondaryColor: ' bg-red-400',
    },
  };

  const checkWhichAccount = () => {
    if (!User?.user || !System?.bankSelected) {
      console.log('err');
      return;
    }

    setAccountForBank(nullAccount);

    User.user.accounts.map((account) => {
      if (account.bank == System.bankSelected.bankName) {
        setAccountForBank(account);
        return;
      }
    });
  };

  useEffect(() => {
    checkWhichAccount();
    checkIfNoAccount();
  }, []);

  const checkIfNoAccount = () => {
    if (User?.user.accounts.length == 0) {
      setHeaderText('Create Account');
      setWantToCreateAccount(true);
    }
  };

  const validateLogin = (pin: number) => {
    const status = pin == accountForBank!.pin;

    if (status) passwordsAreMatched(true);
    else displayWarning();
  };

  const displayWarning = () => {
    setHeaderText("Passwords don't match!");

    setTimeout(() => {
      setHeaderText('Please enter your pin');
    }, 5000);
  };

  const toggleAccountCreation = () => {
    setWantToCreateAccount(true);
  };

  const cancelAccountCreation = () => {
    if (User?.user.accounts.length != 0) {
      setWantToCreateAccount(false);
      setHeaderText('Please enter your pin');
    } else {
      navigator(-1);
    }
  };

  const makeAccountCreationRequest = async () => {
    if (!usernameInput.current!.value || !emailInput.current!.value) {
      setHeaderText('Please Fill All Fields');

      setTimeout(() => {
        setHeaderText('Create Account');
      }, 5000);

      return;
    }

    const newAccount: AccountRequest = {
      bank: System!.bankSelected.bankName,
      username: usernameInput.current!.value,
      userEmail: emailInput.current!.value,
    };

    await createAccountCreationRequest(newAccount);
  };

  if (wantToCreateAccount) {
    return (
      <div className="phone:p-2 laptop:p-4 flex flex-col justify-center laptop:h-[550px]">
        <div className="text-center flex flex-row items-center justify-end">
          <span className="phone:text-2xl">{headerText}</span>
          <img
            src={
              new URL(
                `../../assets/images/${System?.bankSelected.thumbnail.slice(
                  1,
                  System.bankSelected.thumbnail.length
                )}`,
                import.meta.url
              ).href
            }
            className="phone:w-10 phone:h-10 laptop:w-20 laptop:h-20 rounded ml-5"
            alt=""
          />
        </div>

        <div className="phone:text-sm laptop:text-xl phone:mt-3 laptop:mt-5">
          <div className="flex flex-row items-center phone:my-1 laptop:my-3 justify-between">
            <label htmlFor="username">Username: </label>
            <input
              ref={usernameInput}
              id="username"
              type="text"
              placeholder="Ex. Jann"
              className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
            />
          </div>

          <div className="flex flex-row items-center phone:my-1 laptop:my-3 justify-between">
            <label htmlFor="email">Email: </label>
            <input
              ref={emailInput}
              id="email"
              type="text"
              placeholder="Ex. jann@gmail.com"
              className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
            />
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <button
            onClick={makeAccountCreationRequest}
            className="bg-green-500 border-2 border-black laptop:w-[140px] rounded-lg laptop:p-4 laptop:mt-5 self-center"
          >
            <span className="laptop:text-xl text-white">Submit</span>
          </button>

          <button
            onClick={cancelAccountCreation}
            className="bg-red-500 border-2 border-black laptop:w-[140px] rounded-lg laptop:p-4 laptop:mt-5 self-center"
          >
            <span className="laptop:text-xl text-white">Cancel</span>
          </button>
        </div>
      </div>
    );
  } else if (System?.bankSelected && User) {
    return (
      <div className="phone:p-2 laptop:p-4">
        <div className="flex flex-row justify-evenly items-start">
          <div
            className={
              'phone:w-[150px] laptop:w-[300px] phone:mb-2 laptop:mb-6 p-3 rounded-lg' +
              colorScheme[
                System.bankSelected.bankName as keyof typeof colorScheme
              ].primaryColor
            }
          >
            <span className="text-white phone:text-lg laptop:text-3xl font-bold">
              Connected to {System?.bankSelected.bankName}
            </span>
          </div>

          <div
            className={
              'text-white p-3 rounded-lg phone:w-[50px] laptop:w-[150px] h-12' +
              colorScheme[
                System.bankSelected.bankName as keyof typeof colorScheme
              ].primaryColor
            }
          >
            <DropDownMenu
              setAccountForBankPage={setAccountForBank}
              isAccountAndPassMatched={passwordsAreMatched}
              colorScheme={colorScheme}
            />
          </div>

          <div
            className={
              'text-white p-3 rounded-lg phone:w-[50px] text-center laptop:w-[130px] h-12' +
              colorScheme[
                System.bankSelected.bankName as keyof typeof colorScheme
              ].primaryColor
            }
          >
            <button onClick={toggleAccountCreation}>
              <img src="" alt="" className="phone:flex laptop:hidden" />
              <span className="phone:hidden laptop:flex">Add Account</span>
            </button>
          </div>
        </div>

        <div
          className={
            'phone:w-[280px] laptop:w-[600px] mt-2 rounded-lg phone:p-2 laptop:p-6 flex flex-row items-center justify-between' +
            colorScheme[
              System.bankSelected.bankName as keyof typeof colorScheme
            ].primaryColor
          }
        >
          <div className="flex flex-col">
            <span className="text-white phone:text-md laptop:text-2xl">
              <span className="text-u_gray">Name: </span>
              {accountForBank?.name}
            </span>
            <span className="text-white phone:text-sm laptop:text-xl">
              <span className="text-u_gray">Acc #: </span>
              {accountForBank?.accountNumber}
            </span>
          </div>

          <div className="flex flex-row items-center">
            <span className="phone:text-xl laptop:text-5xl text-white">
              {System?.bankSelected.bankName}
            </span>
            <img
              src={
                new URL(
                  `../../assets/images/${System?.bankSelected.thumbnail.slice(
                    1,
                    System.bankSelected.thumbnail.length
                  )}`,
                  import.meta.url
                ).href
              }
              className="phone:w-10 phone:h-10 laptop:w-20 laptop:h-20 rounded ml-5"
              alt=""
            />
          </div>
        </div>

        {arePasswordsMatched ? (
          <div className="flex flex-row justify-between phone:mt-4 laptop:mt-10">
            <ModeSelection />
            <Transaction
              account={accountForBank ? accountForBank : nullAccount}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mt-5">
              <span className="bg-white phone:p-2 laptop:p-4 rounded-lg phone:w-[150px] laptop:w-[230px] text-center phone:text-xs laptop:text-lg">
                {headerText}
              </span>

              <div>
                <NumPad mainOperation={validateLogin} />
              </div>
            </div>
          </>
        )}
      </div>
    );
  } else {
    return <div>Bank not found!</div>;
  }
};

interface DropDownMenuProp {
  setAccountForBankPage: React.Dispatch<
    React.SetStateAction<AccountModel | null>
  >;
  isAccountAndPassMatched: React.Dispatch<React.SetStateAction<boolean>>;
  colorScheme: {
    BDO: {
      primaryColor: string;
      secondaryColor: string;
    };
    BPI: {
      primaryColor: string;
      secondaryColor: string;
    };
  };
}

export const DropDownMenu: React.FC<DropDownMenuProp> = ({
  setAccountForBankPage,
  isAccountAndPassMatched,
  colorScheme,
}) => {
  const User = useContext(UserContext);
  const System = useContext(SystemContext);

  const [isDropdownClicked, dropdownClicked] = useState(false);

  const configureBankPageUI = (account: AccountModel) => {
    setAccountForBankPage(account);
    isAccountAndPassMatched(false);
    dropdownClicked(false);
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={() => dropdownClicked(!isDropdownClicked)}>
        <span className="phone:hidden laptop:flex">Change Account</span>

        <img
          src={
            new URL('../../assets/images/caret-down.png', import.meta.url).href
          }
          className="w-12 phone:flex laptop:hidden"
          alt=""
        />
      </button>

      {isDropdownClicked && (
        <div
          className={
            'phone:p-1 laptop:p-2 rounded absolute phone:w-11 laptop:w-[130px] mt-7' +
            colorScheme[
              System?.bankSelected.bankName as keyof typeof colorScheme
            ].secondaryColor
          }
          id="hover-element"
        >
          {User!.user.accounts.map((account) => (
            <div
              key={account.accountNumber}
              className="flex flex-col hover:bg-white hover:text-black"
              onClick={() => configureBankPageUI(account)}
            >
              {account.bank == System!.bankSelected.bankName && (
                <button className="phone:text-xs laptop:text-lg border-b-2 border-black mt-2">
                  {account.accountNumber}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BankPage;
