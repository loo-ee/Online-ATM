import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../util/systemConfig';

interface Prop {}

const Header: React.FC<Prop> = ({}) => {
  const navigator = useNavigate();

  const returnToHomePage = () => {
    navigator(baseUrl + 'feed/');
  };

  return (
    <div
      id="header"
      className="flex flex-row justify-between items-center pb-3 w-full border-2 fixed bg-white"
    >
      <div className="flex flex-row w-full items-center">
        <img
          src={
            new URL('../../assets/images/money-transfer.png', import.meta.url)
              .href
          }
          className="w-16 ml-3 mt-3"
          onClick={returnToHomePage}
          alt=""
        />
        <span
          className="text-u_darkblue ml-5 laptop:text-5xl tablet:text-2xl phone:text-md"
          onClick={returnToHomePage}
        >
          ATM Service
        </span>
      </div>
      <div className="flex flex-row justify-between phone:w-20 laptop:w-72 mx-7">
        <img
          src={new URL('../../assets/images/protect.png', import.meta.url).href}
          className="w-16 laptop:flex phone:hidden"
          alt=""
        />
        <img
          src={new URL('../../assets/images/pfp.jpg', import.meta.url).href}
          className="phone:w-10 laptop:w-16 rounded-full ml-2 mt-3 phone:mx-12"
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
