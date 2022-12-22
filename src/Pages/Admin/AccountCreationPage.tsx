import { useContext } from 'react';
import { AdminContext } from '../../contexts/AdminContext';
import RequestCard from './RequestCard';

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

export default AccountCreationPage;
