import { useContext } from 'react';
import { AdminContext } from '../../contexts/AdminContext';
import { AccountRequest } from '../../util/systemConfig';

interface Prop {}

const AccountCreationPage: React.FC<Prop> = ({}) => {
  const Admin = useContext(AdminContext);

  return (
    <div className="mt-10 flex flex-col items-center phone:w-[250px] tablet:w-[500px] laptop:w-[700px]">
      <span className="phone:text-xl laptop:text-3xl">
        Account Creation Requests
      </span>

      <div className="mt-5 grid laptop:grid-cols-2">
        {Admin?.accountCreationRequests.map((req) => (
          <RequestCard key={req.username} requestBody={req} />
        ))}
      </div>
    </div>
  );
};

interface RequestCardProp {
  requestBody: AccountRequest;
}

const RequestCard: React.FC<RequestCardProp> = ({ requestBody }) => {
  const bgColor = {
    BDO: 'bg-blue-900',
    BPI: 'bg-red-900',
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
        <button className="bg-green-600 p-2 rounded w-24">Approve</button>
        <button className="bg-red-700 p-2 rounded w-24">Deny</button>
      </div>
    </div>
  );
};

export default AccountCreationPage;
