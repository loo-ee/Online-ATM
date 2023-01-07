import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateAccount } from '../../adapter/userAdapter';
import { SystemContext } from '../../contexts/SystemContext';
import { AccountModel, baseUrl } from '../../util/systemConfig';

interface Prop {}

const AccountEditPage: React.FC<Prop> = ({}) => {
  const System = useContext(SystemContext);
  const nameField = useRef<HTMLInputElement>(null);
  const balanceField = useRef<HTMLInputElement>(null);
  const pinField = useRef<HTMLInputElement>(null);

  const [headerText, setHeaderText] = useState('Account Edit Page');
  const navigator = useNavigate();

  const bgColor = {
    BDO: ' bg-blue-900',
    BPI: ' bg-red-900',
    LANDBANK: ' bg-green-700',
  };

  const validateInputs = () => {
    const fields = [nameField, balanceField, pinField];

    fields.forEach((currentField) => {
      if (currentField.current!.value == '')
        currentField.current!.value = currentField.current!.placeholder;
    });
  };

  const applyChanges = async () => {
    if (!System?.accountSelected) return;

    validateInputs();

    const newAccountDetails: AccountModel = {
      bank: System?.accountSelected.bank,
      accountNumber: System.accountSelected.accountNumber,
      name: nameField.current!.value,
      balance: Number(balanceField.current!.value),
      pin: Number(pinField.current!.value),
    };

    try {
      await updateAccount(newAccountDetails);
      System.setAccountSelected(newAccountDetails);
      setHeaderText('Sucess!');

      setTimeout(() => {
        setHeaderText('Redirecting...');
      }, 2000);

      setTimeout(() => {
        navigator(baseUrl + 'admin/account-creation/');
        navigator(0);
      }, 4000);
    } catch (error) {
      console.log(error);
      setHeaderText('Status: 500');
    }
  };

  return (
    <div className="phone:w-[300px] laptop:w-[700px] mt-10 flex flex-col items-center">
      <span className="phone:text-xl laptop:text-3xl self-center">
        {headerText}
      </span>
      <div
        className={
          'p-4 flex flex-row justify-between text-white items-baseline rounded-lg border-black border-4 phone:mt-2 laptop:mt-4 phone:w-[250px] laptop:w-[500px]' +
          bgColor[System?.accountSelected?.bank as keyof typeof bgColor]
        }
      >
        <span className="phone:text-md laptop:text-4xl">
          {System?.accountSelected.bank}
        </span>
        <span className="phone:text-sm laptop:text-2xl">
          # {System?.accountSelected.accountNumber}
        </span>
      </div>

      <div
        className={
          'p-4 flex flex-col text-white rounded-lg border-black border-4 phone:mt-2 laptop:mt-4 phone:w-[250px] laptop:w-[500px] items-center' +
          bgColor[System?.accountSelected.bank as keyof typeof bgColor]
        }
      >
        <div className="flex flex-row items-center phone:my-1 laptop:my-3 justify-between phone:w-[200px] laptop:w-[350px]">
          <label
            htmlFor="name"
            className="phone:text-sm tablet:text-md laptop:text-lg"
          >
            Name:{' '}
          </label>
          <input
            ref={nameField}
            type="text"
            id="name"
            placeholder={System?.accountSelected.name}
            className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
          />
        </div>

        <div className="flex flex-row items-center phone:my-1 laptop:my-3 justify-between phone:w-[200px] laptop:w-[350px]">
          <label
            htmlFor="balance"
            className="phone:text-sm tablet:text-md laptop:text-lg"
          >
            Balance:{' '}
          </label>
          <input
            ref={balanceField}
            type="number"
            id="balance"
            placeholder={System?.accountSelected.balance.toString()}
            className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
          />
        </div>

        <div className="flex flex-row items-center phone:my-1 laptop:my-3 justify-between phone:w-[200px] laptop:w-[350px]">
          <label
            htmlFor="pin"
            className="phone:text-sm tablet:text-md laptop:text-lg"
          >
            Pin:{' '}
          </label>
          <input
            ref={pinField}
            type="number"
            id="pin"
            placeholder={System?.accountSelected.pin.toString()}
            className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
          />
        </div>
      </div>

      <div className="flex flex-row laptop:mt-3 justify-evenly w-full">
        <button
          onClick={applyChanges}
          className="bg-green-500 phone:p-1 laptop:p-3 phone:w-28 laptop:w-44 border-4 border-black rounded text-white"
        >
          Apply
        </button>

        <button
          onClick={() => navigator(baseUrl + 'admin/account-creation/')}
          className="bg-red-600 phone:p-1 laptop:p-3 phone:w-28 laptop:w-44 border-4 border-black rounded text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AccountEditPage;
