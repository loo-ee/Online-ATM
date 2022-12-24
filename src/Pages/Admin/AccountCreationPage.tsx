import { useContext, useEffect, useRef, useState } from 'react';
import { createAccount } from '../../adapter/adminAdapter';
import { createMessage } from '../../adapter/userAdapter';
import { AdminContext } from '../../contexts/AdminContext';
import { AccountRequest, MessageModel } from '../../util/systemConfig';

interface Prop {}

const AccountCreationPage: React.FC<Prop> = ({}) => {
  const Admin = useContext(AdminContext);
  const [isReadyForChange, setIsReadyForChange] = useState(false);
  const [request, setRequest] = useState<AccountRequest>();
  const [colorScheme, setColorScheme] = useState('');

  return (
    <div className="mt-10 flex flex-col items-center phone:w-[250px] tablet:w-[500px] laptop:w-[700px]">
      {isReadyForChange ? (
        <>
          <span className="phone:text-xl laptop:text-3xl">
            Account Creation
          </span>

          <div className="flex flex-row items-center">
            <div
              className={
                'flex flex-col w-[400px] my-5 justify-center text-white self-center rounded p-5  ' +
                colorScheme
              }
            >
              <span className="">Fill Details</span>

              <div className="mt-4">
                <div className="flex flex-row items-center my-3 justify-between">
                  <label htmlFor="bank">Bank: </label>
                  <input
                    type="text"
                    id="bank"
                    placeholder={request!.bank}
                    className="text-black p-2 rounded"
                  />
                </div>

                <div className="flex flex-row items-center my-3 justify-between">
                  <label htmlFor="username">User name: </label>
                  <input
                    type="text"
                    id="username"
                    placeholder={request!.username}
                    className="text-black p-2 rounded"
                  />
                </div>

                <div className="flex flex-row items-center my-3 justify-between">
                  <label htmlFor="account-number">Account #: </label>
                  <input
                    type="number"
                    id="account-number"
                    placeholder="000"
                    className="text-black p-2 rounded"
                  />
                </div>

                <div className="flex flex-row items-center my-3 justify-between">
                  <label htmlFor="pin">Pin: </label>
                  <input
                    type="number"
                    id="pin"
                    placeholder="1234"
                    className="text-black p-2 rounded"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col ml-4">
              <button className="bg-green-500 my-3 p-3 w-44 rounded text-white">
                Create
              </button>

              <button
                className="bg-red-600 p-3 w-44 rounded text-white"
                onClick={() => setIsReadyForChange(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <span className="phone:text-xl laptop:text-3xl">
            Account Creation Requests
          </span>
          <div className="mt-5 grid laptop:grid-cols-2">
            {Admin?.accountCreationRequests.map((req) => (
              <RequestCard
                key={req.username}
                requestBody={req}
                preparatoryOperation={setIsReadyForChange}
                setRequestForParent={setRequest}
                setColorScheme={setColorScheme}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

interface RequestCardProp {
  requestBody: AccountRequest;
  preparatoryOperation: (status: boolean) => void;
  setRequestForParent: (request: AccountRequest) => void;
  setColorScheme: (color: string) => void;
}

const RequestCard: React.FC<RequestCardProp> = ({
  requestBody,
  preparatoryOperation,
  setRequestForParent,
  setColorScheme,
}) => {
  const messageField = useRef<HTMLInputElement>(null);

  const bgColor = {
    BDO: 'bg-blue-900',
    BPI: 'bg-red-900',
  };

  const prepareToChangePin = () => {
    const color: string = bgColor[requestBody.bank as keyof typeof bgColor];

    preparatoryOperation(true);
    setRequestForParent(requestBody);
    setColorScheme(color);

    if (!messageField.current) return;

    messageField.current.value = `${requestBody.userEmail}, your ${requestBody.bank} account has been created successfully.`;
  };

  const changePin = async () => {
    if (!messageField.current) return;

    const sender = 'admin';
    const receiver = requestBody.userEmail;
    const title = 'Account Creation Successful';
    const body = messageField.current.value;

    const message: MessageModel = {
      sender: sender,
      receiver: receiver,
      title: title,
      body: body,
    };

    await createMessage(message);
    await createAccount(receiver, {
      bank: requestBody.bank,
      name: requestBody.username,
      accountNumber: 1234,
      pin: 1234,
    });
  };

  return (
    <div
      className={
        'laptop:mx-5 my-3 p-4 text-white rounded-lg phone:w-[250px] tablet:w-[300px] ' +
        bgColor[requestBody.bank as keyof typeof bgColor]
      }
    >
      <div>
        <span className="laptop:text-2xl phone:text-md">Account Creation</span>
      </div>

      <div className="flex flex-col mt-2 phone:text-xs">
        <span>Bank: {requestBody.bank}</span>
        <span>Name: {requestBody.username}</span>
      </div>

      <div className="flex flex-row mt-5 justify-evenly">
        <button
          className="bg-green-600 p-2 rounded w-24"
          onClick={prepareToChangePin}
        >
          Approve
        </button>
        <button
          className="bg-red-700 p-2 rounded w-24"
          // TODO: Create delete function to delete account creation request
        >
          Deny
        </button>
      </div>
    </div>
  );
};

export default AccountCreationPage;
