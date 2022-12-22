import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAccountRequests } from '../../adapter/adminAdapter';
import { AdminContext } from '../../contexts/AdminContext';
import { AccountRequest, baseUrl } from '../../util/systemConfig';

interface Prop {}

const AdminFeed: React.FC<Prop> = ({}) => {
  const Admin = useContext(AdminContext);
  const [page, setPage] = useState('account-creation');
  const navigator = useNavigate();

  useEffect(() => {
    fetchAccountRequests();
  }, []);

  useEffect(() => {
    navigator(page + '/');
  }, [page]);

  const fetchAccountRequests = async () => {
    const requests = await getAccountRequests();
    Admin?.setRequests(requests);
  };

  return (
    <div className="flex flex-col self-start border-2 w-full">
      <div className="self-center">
        <span className="text-4xl">Admin Page</span>
      </div>

      <Outlet />
    </div>
  );
};

export default AdminFeed;
