import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  changeAccountPin,
  deleteChangePinRequest,
} from '../../adapter/adminAdapter';
import { createMessage, getAccount } from '../../adapter/userAdapter';
import { AdminContext } from '../../contexts/AdminContext';
import {
  AccountModel,
  AccountRequest,
  ChangePinRequest,
  MessageModel,
} from '../../util/systemConfig';

interface Prop {}

const ChangePinPage: React.FC<Prop> = ({}) => {
  const Admin = useContext(AdminContext);
  const [isReadyForChange, setIsReadyForChange] = useState(false);
  const [request, setRequest] = useState<ChangePinRequest>();
  const accountNumberField = useRef<HTMLInputElement>(null);
  const newPinField = useRef<HTMLInputElement>(null);
  const messageField = useRef<HTMLTextAreaElement>(null);
  const navigator = useNavigate();

  const validateFields = () => {
    const fields = [accountNumberField, newPinField, messageField];

    fields.forEach((currentField) => {
      if (currentField.current!.value == '')
        currentField.current!.value = currentField.current!.placeholder;
    });
  };

  const changePin = async () => {
    validateFields();

    if (!request) return;

    const sender = 'admin';
    const receiver = request.accountNumber.toString();
    const title = 'Account Pin Change Successful';
    const body = messageField.current!.value;

    const message: MessageModel = {
      sender: sender,
      receiver: receiver,
      title: title,
      body: body,
    };

    const foundAccount: AccountModel = await getAccount(request.accountNumber);
    await createMessage(message);
    await changeAccountPin({
      accountNumber: Number(accountNumberField.current!.value),
      balance: foundAccount.balance,
      bank: foundAccount.bank,
      name: foundAccount.name,
      pin: Number(newPinField.current!.value),
    });
    await deleteChangePinRequest(request.accountNumber, request.newPin);

    navigator(0);

    console.log('Change pin succesful');
  };
  return (
    <div className="phone:mt-5 laptop:mt-10 flex flex-col items-center phone:w-[250px] tablet:w-[500px] laptop:w-[700px]">
      {isReadyForChange ? (
        <>
          <span className="phone:text-xl laptop:text-3xl self-center">
            Account Pin Change
          </span>

          <div className="flex phone:flex-col justify-center laptop:flex-row items-center">
            <div className="flex flex-col phone:w-[250px] tablet:w-[300px] laptop:w-[500px] phone:my-3 laptop:my-5 justify-center text-white self-center rounded p-5  bg-u_darkblue">
              <span className="">Fill Details</span>

              <div className="mt-4">
                <div className="flex flex-row items-center phone:my-1 laptop:my-3 justify-between">
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
                    placeholder={request!.accountNumber.toString()}
                    className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
                  />
                </div>

                <div className="flex flex-row items-center my-3 justify-between">
                  <label
                    htmlFor="new-pin"
                    className="phone:text-sm tablet:text-md laptop:text-lg"
                  >
                    New pin:{' '}
                  </label>
                  <input
                    ref={newPinField}
                    type="number"
                    id="new-pin"
                    placeholder={request!.newPin.toString()}
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
                    placeholder={`${
                      request!.accountNumber
                    }, your pin has been changed into ${
                      request!.newPin
                    } successfully.`}
                    className="text-black laptop:w-[238px] phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex phone:flex-row phone:justify-between tablet:justify-around phone:w-full laptop:w-auto laptop:flex-col laptop:ml-4">
              <button
                className="bg-green-500 laptop:my-3 phone:p-1 laptop:p-3 phone:w-28 laptop:w-44 rounded text-white"
                onClick={changePin}
              >
                Approve
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
        <div className="flex flex-col">
          <span className="phone:text-xl laptop:text-3xl self-center">
            Change Pin Requests
          </span>

          <div className="phone:mt-3 laptop:mt-5 grid laptop:grid-cols-2">
            {Admin?.changePinRequests.map((req) => (
              <RequestCard
                key={req.accountNumber}
                requestBody={req}
                preparatoryOperation={setIsReadyForChange}
                setRequestForParent={setRequest}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface RequestCardProp {
  requestBody: ChangePinRequest;
  preparatoryOperation: (status: boolean) => void;
  setRequestForParent: (request: ChangePinRequest) => void;
}

const RequestCard: React.FC<RequestCardProp> = ({
  requestBody,
  preparatoryOperation,
  setRequestForParent,
}) => {
  const navigator = useNavigate();

  const prepareToChangePin = () => {
    setRequestForParent(requestBody);
    preparatoryOperation(true);
  };

  return (
    <div className="laptop:mx-5 my-3 p-4 text-white rounded-lg phone:w-[250px] tablet:w-[300px] bg-u_darkblue">
      <div>
        <span className="phone:text-md laptop:text-2xl">
          {requestBody.title}
        </span>
      </div>

      <div className="flex flex-col mt-2 phone:text-xs">
        <span>Account #: {requestBody.accountNumber}</span>
        <span>New Pin: {requestBody.newPin}</span>
        <span className="mt-3">Reason for change:</span>
        <span>{requestBody.body}</span>
      </div>

      <div className="flex flex-row mt-5 justify-evenly">
        <button
          className="bg-green-600 p-2 rounded w-24"
          onClick={prepareToChangePin}
        >
          Check
        </button>
        <button
          className="bg-red-700 p-2 rounded w-24"
          onClick={async () => {
            await deleteChangePinRequest(
              requestBody.accountNumber,
              requestBody.newPin
            );

            navigator(0);
          }}
        >
          Deny
        </button>
      </div>
    </div>
  );
};

export default ChangePinPage;
