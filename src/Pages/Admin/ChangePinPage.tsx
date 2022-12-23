import { useContext } from 'react';
import { AdminContext } from '../../contexts/AdminContext';
import { ChangePinRequest } from '../../util/systemConfig';

interface Prop {}

const ChangePinPage: React.FC<Prop> = ({}) => {
  const Admin = useContext(AdminContext);

  return (
    <div className="mt-10 flex flex-col items-center phone:w-[250px] tablet:w-[500px] laptop:w-[700px]">
      <span className="phone:text-xl laptop:text-3xl">Change Pin Requests</span>

      <div className="mt-5 grid laptop:grid-cols-2">
        {Admin?.changePinRequests.map((req) => (
          <RequestCard key={req.accountNumber} requestBody={req} />
        ))}
      </div>
    </div>
  );
};

interface RequestCardProp {
  requestBody: ChangePinRequest;
}

const RequestCard: React.FC<RequestCardProp> = ({ requestBody }) => {
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
        <span>Reason for change:</span>
        <span>{requestBody.body}</span>
      </div>

      <div className="flex flex-row mt-5 justify-evenly">
        <button className="bg-green-600 p-2 rounded w-24">Approve</button>
        <button className="bg-red-700 p-2 rounded w-24">Deny</button>
      </div>
    </div>
  );
};

export default ChangePinPage;
