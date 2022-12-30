import { Outlet } from 'react-router-dom';
import Controls from './Controls/Controls';
import Header from './Header';

interface Prop {}

const HomePage: React.FC<Prop> = ({}) => {
  return (
    <>
      <Header />
      <div className="flex phone:flex-col laptop:flex-row items-center mt-28">
        <div className="phone:hidden laptop:flex">
          <Controls />
        </div>
        <div
          id="home-page"
          className="bg-secondary border-black border-4 tablet:w-full phone:w-[300px] rounded-xl p-6 mx-6 flex flex-col items-center"
        >
          <Outlet />
        </div>
        <div className="w-96 h-80 border-2 laptop:flex tablet:hidden phone:hidden">
          info
        </div>

        <div className="phone:flex laptop:hidden -mt-16">
          <Controls />
        </div>
      </div>
    </>
  );
};

export default HomePage;
