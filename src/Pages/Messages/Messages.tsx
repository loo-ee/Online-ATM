import { useContext, useEffect, useState } from 'react';
import { getMessages } from '../../adapter/userAdapter';
import { UserContext } from '../../contexts/UserContext';
import { MessageModel } from '../../util/systemConfig';

interface Prop {}

const Messages: React.FC<Prop> = ({}) => {
  const User = useContext(UserContext);

  return (
    <div>
      <span>Messages</span>

      <Inbox receiver={User!.user.email} />

      <div className="">
        {User?.user.accounts.map((account) => (
          <Inbox
            key={account.accountNumber}
            receiver={account.accountNumber.toString()}
          />
        ))}
      </div>
    </div>
  );
};

interface InboxProp {
  receiver: string;
}

const Inbox: React.FC<InboxProp> = ({ receiver }) => {
  const [messages, setMessages] = useState<MessageModel[]>();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const foundMessages = await getMessages(receiver);
    setMessages(foundMessages);
  };

  return (
    <div className="bg-u_skyblue my-3 p-3 rounded text-white">
      <span>Messages for {receiver}</span>

      <div>
        {messages?.map((message) => (
          <MessageCard key={message.body} message={message} />
        ))}
      </div>

      <div></div>
    </div>
  );
};

interface MessageCardProp {
  message: MessageModel;
}

const MessageCard: React.FC<MessageCardProp> = ({ message }) => {
  return <div>{message.body}</div>;
};

export default Messages;
