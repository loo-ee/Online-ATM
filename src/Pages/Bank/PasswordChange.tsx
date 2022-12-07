import { useState } from 'react';
import NumPad from '../../util/NumPad';
import { AccountModel } from '../../util/systemConfig';
import BankPageHeader from './BankgPageHeader';

interface Prop {
  account: AccountModel;
}

const PasswordChange: React.FC<Prop> = ({ account }) => {
  const [headerText, setHeaderText] = useState('Verify login');
  const [arePasswordsMatched, passWordsAreMatched] = useState(false);

  const validatePin = (pin: number) => {
    if (!account) return;

    if (account.pin == pin) {
      setHeaderText('Change Pin');
      passWordsAreMatched(true);
    } else setHeaderText("Pins don't match!");
  };

  const changePin = (pin: number) => {
    if (!account) return;

    account.pin = pin;
    setHeaderText('Pin was successfully changed!');
  };

  return (
    <div className="flex flex-col items-center">
      <BankPageHeader headerText={headerText} />
      <NumPad mainOperation={!arePasswordsMatched ? validatePin : changePin} />
    </div>
  );
};

export default PasswordChange;
