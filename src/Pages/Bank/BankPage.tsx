import { useContext, useState, useEffect } from 'react';
import { SystemContext } from '../../contexts/SystemContext';
import { UserContext, nullAccount } from '../../contexts/UserContext';
import NumPad from '../../util/NumPad';
import { AccountModel } from '../../util/systemConfig';
import ModeSelection from './ModeSelection';
import Transaction from './Transaction';

interface Prop {}

const BankPage: React.FC<Prop> = ({}) => {
  const System = useContext(SystemContext);
  const User = useContext(UserContext);
  const [arePasswordsMatched, passwordsAreMatched] = useState(false);
  const [headerText, setHeaderText] = useState('Please enter your pin');
  const [accountForBank, setAccountForBank] = useState<AccountModel | null>(
    null
  );

  const colorScheme = {
    BDO: {
      dropdownHeader: ' bg-blue-900',
      dropdownItems: ' bg-blue-500',
    },
    BPI: {
      dropdownHeader: ' bg-red-900',
      dropdownItems: ' bg-red-500',
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
        console.log('test');
      } else {
        console.log('none');
      }
    });
  };

  useEffect(() => {
    checkWhichAccount();
  }, []);

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

  if (!User) {
    return <div>Link Account</div>;
  } else if (System?.bankSelected && User) {
    return (
      <div>
        <div className="flex flex-row justify-between">
          <div className="phone:mb-2 laptop:mb-9">
            <span className="text-u_darkblue phone:text-lg laptop:text-3xl">
              Connected to {System?.bankSelected.bankName}
            </span>
          </div>

          <div
            className={
              'text-white p-3 rounded-lg w-[150px] h-12' +
              colorScheme[
                System.bankSelected.bankName as keyof typeof colorScheme
              ].dropdownHeader
            }
          >
            <DropDownMenu
              setAccountForBankPage={setAccountForBank}
              isAccountAndPassMatched={passwordsAreMatched}
              colorScheme={colorScheme}
            />
          </div>
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
          <div className="flex flex-row justify-between mt-10">
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

interface Prop {
  setAccountForBankPage: React.Dispatch<
    React.SetStateAction<AccountModel | null>
  >;
  isAccountAndPassMatched: React.Dispatch<React.SetStateAction<boolean>>;
  colorScheme: {
    BDO: {
      dropdownHeader: string;
      dropdownItems: string;
    };
    BPI: {
      dropdownHeader: string;
      dropdownItems: string;
    };
  };
}

export const DropDownMenu: React.FC<Prop> = ({
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
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={() => dropdownClicked(!isDropdownClicked)}>
        Change Account
      </button>

      {isDropdownClicked && (
        <div
          className={
            'p-2 rounded absolute w-[130px] mt-7' +
            colorScheme[
              System?.bankSelected.bankName as keyof typeof colorScheme
            ].dropdownItems
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
                <button>{account.accountNumber}</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BankPage;
