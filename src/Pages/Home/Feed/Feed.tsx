import { useContext } from 'react';
import { SystemContext } from '../../../contexts/SystemContext';
import BankCard from '../../Bank/BankCard';

interface Prop {}

const Feed: React.FC<Prop> = ({}) => {
  const System = useContext(SystemContext);

  return (
    <div className="flex flex-col tablet:w-[300px] laptop:w-full phone:w-[100px] items-center">
      <div className="flex flex-col items-center">
        <img
          src={
            new URL(
              '../../../assets/images/user-ui-banner.jpg',
              import.meta.url
            ).href
          }
          className="tablet:h-[100px] tablet:w-[300px] laptop:h-[230px] laptop:w-[670px] rounded-lg mb-6 phone:hidden tablet:flex"
          alt=""
        />
        <div>
          <span className="phone:mt-3 tablet:mt-7 self-start text-black phone:text-2xl tablet:text-4xl phone:self-center laptop:self-start laptop:ml-5">
            Banks Linked
          </span>
        </div>
        <div className="grid laptop:grid-flow-col overflow-x-scroll phone:h-[400px] phone:w-[3000px] tablet:h-[300px] tablet:w-[650px] phone:grid-flow-row phone:justify-center laptop:justify-start scrollbar-thin">
          {System?.banks.map((bank) => (
            <BankCard bank={bank} key={bank.bankName} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
