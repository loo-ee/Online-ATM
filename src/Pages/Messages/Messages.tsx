import { useContext, useEffect, useState } from 'react';
import { getMessages } from '../../adapter/userAdapter';
import { UserContext } from '../../contexts/UserContext';
import { MessageModel } from '../../util/systemConfig';

interface Prop {}

const Messages: React.FC<Prop> = ({}) => {
  const User = useContext(UserContext);

  return (
    <div className="w-[700px]">
      <span className="text-5xl flex flex-col items-center mb-8">
        User Inbox
      </span>

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

  if (messages?.length == 0) return <></>;
  else
    return (
      <div className={'my-6 p-5 rounded-lg bg-primary'}>
        <span className="ml-4 text-3xl text-white">
          Messages for <span className="text-secondary">{receiver}</span>
        </span>

        <div className="mt-3 overflow-x-scroll grid-flow-col grid scrollbar-thin">
          {messages?.map((message) => (
            <MessageCard key={message.body} message={message} />
          ))}
        </div>
      </div>
    );
};

interface MessageCardProp {
  message: MessageModel;
}

const MessageCard: React.FC<MessageCardProp> = ({ message }) => {
  return (
    <div className={'mx-4 w-[300px] rounded-lg p-4 text-black bg-u_gray'}>
      <span className="text-2xl text-red-600">{message.title}</span>

      <div className="mt-4">
        <span className="text-xl">Sender: {message.sender}</span>

        <div className="">
          <div className="flex flex-col mt-3">
            <span>Content:</span>
            <span>{message.body}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
