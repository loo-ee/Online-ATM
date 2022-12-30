import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SystemContext } from '../../contexts/SystemContext';
import { BankModel, baseUrl } from '../../util/systemConfig';

interface Prop {
  bank: BankModel;
}

const BankCard: React.FC<Prop> = ({ bank }) => {
  const System = useContext(SystemContext);
  const navigator = useNavigate();

  const onBankSelect = () => {
    System!.setBankSelected(bank);
    navigator(baseUrl + 'vendor/');
  };

  return (
    <div
      id={System?.bankSelected.bankName}
      className="bg-u_gray m-5 phone:w-64 tablet:w-80 p-3 rounded-lg"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col phone:w-60">
          <span className="text-u_darkblue phone:text-md tablet:text-3xl">
            {bank.bankName}
          </span>
          <span className="mt-3">{bank.description}</span>
        </div>
        <img
          src={
            new URL(
              `../../assets/images/${bank.thumbnail.slice(
                1,
                bank.thumbnail.length
              )}`,
              import.meta.url
            ).href
          }
          className="w-24 h-24 rounded mb-4 ml-3"
          alt=""
        />
      </div>

      <div className="flex flex-row justify-between items-center">
        <span className="text-u_darkblue text-xl">Active</span>
        <button
          onClick={onBankSelect}
          className="border-u_gray bg-u_darkblue text-u_gray p-2 rounded-lg w-24"
        >
          Open
        </button>
      </div>
    </div>
  );
};

export default BankCard;
