import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import Feed from './Feed/Feed';
import Header from './Header';

interface Prop {}

const HomePage: React.FC<Prop> = ({}) => {
  const User = useContext(UserContext);

  return (
    <>
      <Header />
      <div className="flex flex-row justify-between mt-28">
        <div className="w-28 border-2 h-80 laptop:flex tablet:flex phone:hidden">
          controls
        </div>
        <div
          id="home-page"
          className="bg-u_gray tablet:w-full phone:w-[300px] rounded-xl p-6 mx-6 flex flex-col items-center"
        >
          <Outlet />
        </div>
        <div className="w-96 h-80 border-2 laptop:flex tablet:hidden phone:hidden">
          info
        </div>
      </div>
    </>
  );
};

export default HomePage;
