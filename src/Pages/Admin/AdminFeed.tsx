import { useContext, useEffect } from 'react';
import { getAccountRequests } from '../../adapter/adminAdapter';
import { AdminContext } from '../../contexts/AdminContext';
import { AccountRequest } from '../../util/systemConfig';

interface Prop {}

const AdminFeed: React.FC<Prop> = ({}) => {
  const Admin = useContext(AdminContext);

  useEffect(() => {
    fetchAccountRequests();
  }, []);

  const fetchAccountRequests = async () => {
    const requests = await getAccountRequests();
    Admin?.setRequests(requests);
  };

  return (
    <div className="flex flex-col self-start border-2 w-full">
      <div className="self-center">
        <span className="text-4xl">Admin Page</span>
      </div>

      <div className="mt-10 flex flex-col items-start">
        <span className="text-3xl">Requests</span>

        <div className="mt-5">
          {Admin?.requests.map((req) => (
            <RequestCard key={req.username} requestBody={req} />
          ))}
        </div>
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

export default AdminFeed;
