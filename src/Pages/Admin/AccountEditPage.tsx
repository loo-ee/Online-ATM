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
    <div className="phone:w-[250px] laptop:w-[700px] mt-10 flex flex-col">
      <span className="laptop:text-3xl self-center">Account Edit Page</span>
      <div
        className={
          'p-4 flex flex-row justify-between text-white items-baseline rounded-lg border-black border-4 laptop:mt-4' +
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
          'p-4 flex flex-col text-white rounded-lg border-black border-4 laptop:mt-4' +
          bgColor[System?.accountSelected.bank as keyof typeof bgColor]
        }
      >
        <span></span>
      </div>
    </div>
  );
};

export default AccountEditPage;
