import { useState } from 'react';
import { createChangePinRequest } from '../../adapter/userAdapter';
import NumPad from '../../util/NumPad';
import { AccountModel, ChangePinRequest } from '../../util/systemConfig';
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

  const changePin = async (pin: number) => {
    if (!account) return;

    const request: ChangePinRequest = {
      accountNumber: account.accountNumber,
      newPin: pin,
      title: 'Change pin UwU',
      body: 'Please sir UwUUUUUUUUU',
    };

    await createChangePinRequest(request);
    setHeaderText('Pin change request submitted to admin');
  };

  return (
    <div className="flex flex-col items-center">
      <BankPageHeader headerText={headerText} />
      <NumPad mainOperation={!arePasswordsMatched ? validatePin : changePin} />
    </div>
  );
};

export default PasswordChange;
