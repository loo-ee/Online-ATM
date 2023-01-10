import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import { baseUrl } from '../../../util/systemConfig';

interface Prop {}

const Controls: React.FC<Prop> = ({}) => {
  const User = useContext(UserContext);
  const navigator = useNavigate();
  const [isAccountCreationMode, setIsAccountCreationMode] = useState(false);
  const [adminMode, setAdminMode] = useState('Acc Creation');

  const goToMessages = () => {
    navigator(baseUrl + 'messages/');
  };

  const logout = () => {
    localStorage.clear();
    navigator(0);
  };

  const goBack = () => {
    navigator(-1);
  };

  const goToHome = () => {
    navigator(baseUrl + 'feed/');
  };

  const switchAdminModes = () => {
    if (isAccountCreationMode) {
      navigator(baseUrl + 'admin/account-creation/');
      setAdminMode('Pin Change');
    } else {
      navigator(baseUrl + 'admin/pin-change/');
      setAdminMode('Acc Creation');
    }

    setIsAccountCreationMode(!isAccountCreationMode);
  };

  return (
    <div className="flex phone:flex-row laptop:flex-col phone:w-96 laptop:w-32 rounded-lg phone:h-[150px] laptop:h-[600px] items-center justify-center p-3">
      {User?.user.isAdmin && (
        <SettingsButton
          text={adminMode}
          imgSrc="swap.png"
          operation={switchAdminModes}
        />
      )}

      {!User?.user.isAdmin && (
        <SettingsButton
          text="Messages"
          imgSrc="message.png"
          operation={goToMessages}
        />
      )}

      <SettingsButton text="Logout" imgSrc="settings.png" operation={logout} />

      <SettingsButton
        text="Go Back"
        imgSrc="turn-back.png"
        operation={goBack}
      />

      {!User?.user.isAdmin && (
        <SettingsButton text="Home" imgSrc="home.png" operation={goToHome} />
      )}
    </div>
  );
};

interface SettingsButtonProp {
  text: string;
  imgSrc: string;
  operation: () => void;
}

export const SettingsButton: React.FC<SettingsButtonProp> = ({
  text,
  imgSrc,
  operation,
}) => {
  return (
    <div
      className="text-center phone:w-20 phone:h-28 laptop:w-24 laptop:h-32 mx-1 my-1 border-4 border-black items-center bg-u_gray p-3 rounded-lg"
      onClick={operation}
    >
      <img
        src={new URL(`../../../assets/images/${imgSrc}`, import.meta.url).href}
        className=""
        alt=""
      />
      <span className="phone:text-xs laptop:text-[15px]">{text}</span>
    </div>
  );
};

export default Controls;
