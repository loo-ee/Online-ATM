import { useContext } from 'react';
import { SystemContext } from '../../contexts/SystemContext';

interface Prop {}

const AccountEditPage: React.FC<Prop> = ({}) => {
  const System = useContext(SystemContext);

  const bgColor = {
    BDO: ' bg-blue-900',
    BPI: ' bg-red-900',
    LANDBANK: ' bg-green-700',
  };

  return (
    <div className="phone:w-[250px] laptop:w-[700px] mt-10 flex flex-col items-center">
      <span className="laptop:text-3xl self-center">Account Edit Page</span>
      <div
        className={
          'p-4 flex flex-row justify-between text-white items-baseline rounded-lg border-black border-4 laptop:mt-4 laptop:w-[500px]' +
          bgColor[System?.accountSelected?.bank as keyof typeof bgColor]
        }
      >
        <span className="laptop:text-4xl">{System?.accountSelected.bank}</span>
        <span className="laptop:text-2xl">
          # {System?.accountSelected.accountNumber}
        </span>
      </div>

      <div
        className={
          'p-4 flex flex-col text-white rounded-lg border-black border-4 laptop:mt-4 laptop:w-[500px] items-center' +
          bgColor[System?.accountSelected.bank as keyof typeof bgColor]
        }
      >
        <div className="flex flex-row items-center phone:my-1 laptop:my-3 justify-between w-[350px]">
          <label
            htmlFor="name"
            className="phone:text-sm tablet:text-md laptop:text-lg"
          >
            Name:{' '}
          </label>
          <input
            type="text"
            id="name"
            placeholder={System?.accountSelected.name}
            className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
          />
        </div>

        <div className="flex flex-row items-center phone:my-1 laptop:my-3 justify-between w-[350px]">
          <label
            htmlFor="balance"
            className="phone:text-sm tablet:text-md laptop:text-lg"
          >
            Balance:{' '}
          </label>
          <input
            type="number"
            id="balance"
            placeholder={System?.accountSelected.balance.toString()}
            className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
          />
        </div>

        <div className="flex flex-row items-center phone:my-1 laptop:my-3 justify-between w-[350px]">
          <label
            htmlFor="pin"
            className="phone:text-sm tablet:text-md laptop:text-lg"
          >
            Pin:{' '}
          </label>
          <input
            type="number"
            id="pin"
            placeholder={System?.accountSelected.pin.toString()}
            className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountEditPage;
