import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import AccountsPanel from '../Admin/AccountsPanel';
import Controls from './Controls/Controls';
import Header from './Header';
import Info from './Info/Info';

interface Prop {}

const HomePage: React.FC<Prop> = ({}) => {
  const User = useContext(UserContext);

  return (
    <>
      <Header />
      <div className="flex phone:flex-col laptop:flex-row phone:items-center laptop:items-start mt-28">
        <div className="phone:hidden laptop:flex">
          <Controls />
        </div>
        <div
          id="home-page"
          className="bg-secondary border-black border-4 tablet:w-full phone:w-[300px] rounded-xl p-6 mx-6 flex flex-col items-center"
        >
          <Outlet />
        </div>
        <div className="phone:w-[300px] laptop:w-full phone:mt-4 laptop:mt-0 bg-secondary border-4 border-black rounded-lg p-4 justify-center">
          {User?.user.isAdmin ? <AccountsPanel /> : <Info />}
        </div>

        <div className="phone:flex laptop:hidden mt-2">
          <Controls />
        </div>
      </div>
    </>
  );
};

export default HomePage;
