import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { MessageModel } from '../../util/systemConfig';

interface Prop {}

const Messages: React.FC<Prop> = ({}) => {
  const User = useContext(UserContext);

  return (
    <div>
      <span>Messages</span>

      <Inbox receiver={User!.user.email} />

      {User?.user.accounts.map((account) => (
        <Inbox
          key={account.accountNumber}
          receiver={account.accountNumber.toString()}
        />
      ))}
    </div>
  );
};

interface InboxProp {
  receiver: string;
}

const Inbox: React.FC<InboxProp> = ({ receiver }) => {
  const [messages, setMessages] = useState<MessageModel[]>();

  useEffect(() => {}, []);

  return (
    <div>
      <span>Messages for {receiver}</span>

      <div></div>
    </div>
  );
};

interface MessageCardProp {
  message: MessageModel;
}

const MessageCard: React.FC<MessageCardProp> = ({ message }) => {
  return <div></div>;
};

export default Messages;
