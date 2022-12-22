import { useContext } from 'react';
import { AdminContext } from '../../contexts/AdminContext';
import { AccountRequest } from '../../util/systemConfig';

interface Prop {}

const AccountCreationPage: React.FC<Prop> = ({}) => {
  const Admin = useContext(AdminContext);

  return (
    <div className="mt-10 flex flex-col items-start">
      <span className="text-3xl">Requests</span>

      <div className="mt-5">
        {Admin?.requests.map((req) => (
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
        'my-3 p-4 text-white rounded-lg phone:w-[150px] tablet:w-[300px] ' +
        bgColor[requestBody.bank as keyof typeof bgColor]
      }
    >
      <div>
        <span className="text-2xl">Account Creation</span>
      </div>

      <div className="flex flex-col mt-2">
        <span>Bank: {requestBody.bank}</span>
        <span>Name: {requestBody.username}</span>
      </div>
    </div>
  );
};

export default AccountCreationPage;
