import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../util/systemConfig';

interface Prop {}

const Controls: React.FC<Prop> = ({}) => {
  const navigator = useNavigate();

  const goToMessages = () => {
    navigator(baseUrl + 'messages/');
  };

  return (
    <div className="flex-col w-32 rounded-lg h-80 laptop:flex tablet:flex phone:hidden items-center justify-evenly p-3">
      <div
        className="w-24 h-32 border-4 border-black items-center bg-u_gray p-3 rounded-lg"
        onClick={goToMessages}
      >
        <img
          src={
            new URL('../../../assets/images/message.png', import.meta.url).href
          }
          className=""
          alt=""
        />
        <span>Messages</span>
      </div>

      <div className="w-24 h-32 border-4 border-black bg-u_gray items-center p-3 rounded-lg">
        <img
          src={
            new URL('../../../assets/images/settings.png', import.meta.url).href
          }
          alt=""
        />
        <span>Settings</span>
      </div>
    </div>
  );
};

export default Controls;
