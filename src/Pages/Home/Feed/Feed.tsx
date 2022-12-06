import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { SystemContext } from '../../../contexts/SystemContext';
import { banks, baseUrl } from '../../../util/systemConfig';
import BankCard from '../../Bank/BankCard';

interface Prop {}

const Feed: React.FC<Prop> = ({}) => {
  const System = useContext(SystemContext);
  const navigator = useNavigate();

  return (
    <div className="flex flex-col tablet:w-[300px] laptop:w-[500px] phone:w-[100px] items-center">
      <div className="flex flex-col items-center">
        <img
          src={
            new URL(
              '../../../assets/images/user-ui-banner.jpg',
              import.meta.url
            ).href
          }
          className="tablet:h-[100px] tablet:w-[300px] laptop:h-[230px] laptop:w-[670px] rounded-lg phone:hidden tablet:flex"
          alt=""
        />
        <span className="phone:my-2 laptop:my-6 self-start text-u_darkblue text-4xl phone:self-center laptop:self-start">
          Banks Linked
        </span>
        <div className="grid laptop:grid-flow-col overflow-x-scroll phone:h-[300px] phone:w-[3000px] tablet:h-[300px] tablet:w-[650px] phone:grid-flow-row phone:justify-center laptop:justify-start">
          {banks.map((bank) => (
            <BankCard bank={bank} key={bank.bankName} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
