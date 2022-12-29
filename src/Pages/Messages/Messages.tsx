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

      <Inbox receiver={User!.user.email} inboxType="user" />

      <div className="">
        {User?.user.accounts.map((account) => (
          <Inbox
            key={account.accountNumber}
            receiver={account.accountNumber.toString()}
            inboxType="account"
          />
        ))}
      </div>
    </div>
  );
};

interface InboxProp {
  receiver: string;
  inboxType: string;
}

const Inbox: React.FC<InboxProp> = ({ receiver, inboxType }) => {
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
      <div className=" my-3 p-3 rounded">
        <span className="ml-4 text-3xl">
          Messages for <span className="text-u_darkblue">{receiver}</span>
        </span>

        <div className="mt-3 overflow-x-scroll grid-flow-col grid hide-scroll">
          {messages?.map((message) => (
            <MessageCard
              key={message.body}
              message={message}
              inboxType={inboxType}
            />
          ))}
        </div>

        <div></div>
      </div>
    );
};

interface MessageCardProp {
  message: MessageModel;
  inboxType: string;
}

const MessageCard: React.FC<MessageCardProp> = ({ message, inboxType }) => {
  const colorSchemes = {
    user: {
      bg: ' bg-blue-500',
      textBg: ' text-white',
    },
    account: {
      bg: ' bg-red-500',
      textBg: ' text-white',
    },
  };

  return (
    <div
      className={
        'mx-4 w-[300px] rounded-lg p-4' +
        colorSchemes[inboxType as keyof typeof colorSchemes].bg +
        colorSchemes[inboxType as keyof typeof colorSchemes].textBg
      }
    >
      <span className="text-2xl">{message.title}</span>

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
