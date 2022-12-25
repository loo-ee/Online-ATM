import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createAccount,
  deleteAccountRequests,
  getAccountRequests,
} from '../../adapter/adminAdapter';
import { createMessage } from '../../adapter/userAdapter';
import { AdminContext } from '../../contexts/AdminContext';
import { AccountRequest, MessageModel } from '../../util/systemConfig';

interface Prop {}

const AccountCreationPage: React.FC<Prop> = ({}) => {
  const Admin = useContext(AdminContext);
  const [isReadyForChange, setIsReadyForChange] = useState(false);
  const [request, setRequest] = useState<AccountRequest>();
  const [colorScheme, setColorScheme] = useState('');
  const bankField = useRef<HTMLInputElement>(null);
  const usernameField = useRef<HTMLInputElement>(null);
  const accountNumberField = useRef<HTMLInputElement>(null);
  const pinField = useRef<HTMLInputElement>(null);
  const messageField = useRef<HTMLTextAreaElement>(null);
  const navigator = useNavigate();

  const approveAccountCreation = async () => {
    validateFields();
    if (!request) return;

    const sender = 'admin';
    const receiver = request.userEmail;
    const title = 'Account Creation Successful';
    const body = messageField.current!.value;

    const message: MessageModel = {
      sender: sender,
      receiver: receiver,
      title: title,
      body: body,
    };

    await createMessage(message);
    await createAccount({
      userEmail: receiver,
      bank: bankField.current!.value,
      name: usernameField.current!.value,
      accountNumber: accountNumberField.current!.value,
      pin: pinField.current!.value,
    });
    await deleteAccountRequests(
      usernameField.current!.value,
      bankField.current!.value
    );

    navigator(0);
  };

  const validateFields = () => {
    const fields = [
      bankField,
      usernameField,
      accountNumberField,
      pinField,
      messageField,
    ];

    fields.forEach((currentField) => {
      if (currentField.current!.value == '')
        currentField.current!.value = currentField.current!.placeholder;
    });
  };

  return (
    <div className="mt-10 flex flex-col items-center phone:w-[250px] tablet:w-[500px] laptop:w-[700px]">
      {isReadyForChange ? (
        <>
          <span className="phone:text-xl laptop:text-3xl">
            Account Creation
          </span>

          <div className="flex phone:flex-col justify-center laptop:flex-row items-center">
            <div
              className={
                'flex flex-col phone:w-[250px] tablet:w-[300px] laptop:w-[500px] my-5 justify-center text-white self-center rounded p-5  ' +
                colorScheme
              }
            >
              <span className="">Fill Details</span>

              <div className="mt-4">
                <div className="flex flex-row items-center phone:my-1 laptop:my-3 justify-between">
                  <label
                    htmlFor="bank"
                    className="phone:text-sm tablet:text-md laptop:text-lg"
                  >
                    Bank:{' '}
                  </label>
                  <input
                    ref={bankField}
                    type="text"
                    id="bank"
                    placeholder={request!.bank}
                    className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
                  />
                </div>

                <div className="flex flex-row items-center my-3 justify-between">
                  <label
                    htmlFor="username"
                    className="phone:text-sm tablet:text-md laptop:text-lg"
                  >
                    User name:{' '}
                  </label>
                  <input
                    ref={usernameField}
                    type="text"
                    id="username"
                    placeholder={request!.username}
                    className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
                  />
                </div>

                <div className="flex flex-row items-center my-3 justify-between">
                  <label
                    htmlFor="account-number"
                    className="phone:text-sm tablet:text-md laptop:text-lg"
                  >
                    Account #:{' '}
                  </label>
                  <input
                    ref={accountNumberField}
                    type="number"
                    id="account-number"
                    placeholder="000"
                    className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
                  />
                </div>

                <div className="flex flex-row items-center my-3 justify-between">
                  <label
                    htmlFor="pin"
                    className="phone:text-sm tablet:text-md laptop:text-lg"
                  >
                    Pin:{' '}
                  </label>
                  <input
                    ref={pinField}
                    type="number"
                    id="pin"
                    placeholder="1234"
                    className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
                  />
                </div>

                <div className="flex flex-row items-center my-3 justify-between">
                  <label
                    htmlFor="pin"
                    className="phone:text-sm tablet:text-md laptop:text-lg"
                  >
                    Message:{' '}
                  </label>
                  <textarea
                    ref={messageField}
                    id="message"
                    cols={20}
                    rows={5}
                    placeholder={`${request!.userEmail}, your ${
                      request?.bank
                    } account has been created successfully.`}
                    className="text-black laptop:w-[250px] phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex phone:flex-row phone:justify-between tablet:justify-around phone:w-full laptop:w-auto laptop:flex-col laptop:ml-4">
              <button
                className="bg-green-500 laptop:my-3 phone:p-1 laptop:p-3 phone:w-28 laptop:w-44 rounded text-white"
                onClick={approveAccountCreation}
              >
                Create
              </button>

              <button
                className="bg-red-600 phone:p-1 laptop:p-3 phone:w-28 laptop:w-44 rounded text-white"
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
  const bgColor = {
    BDO: 'bg-blue-900',
    BPI: 'bg-red-900',
  };

  const prepareToCreateAccount = () => {
    const color: string = bgColor[requestBody.bank as keyof typeof bgColor];

    preparatoryOperation(true);
    setRequestForParent(requestBody);
    setColorScheme(color);
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
          onClick={prepareToCreateAccount}
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
