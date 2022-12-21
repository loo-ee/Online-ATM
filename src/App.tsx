import { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { getBanks } from './adapter/systemAdapter';
import { auth, getLinkedAccounts } from './adapter/userAdapter';
import { SystemContext } from './contexts/SystemContext';
import { UserContext } from './contexts/UserContext';
import AdminFeed from './Pages/Admin/AdminFeed';
import BankPage from './Pages/Bank/BankPage';
import Feed from './Pages/Home/Feed/Feed';
import HomePage from './Pages/Home/HomePage';
import Login from './Pages/Login/Login';
import { baseUrl } from './util/systemConfig';

function App() {
  const User = useContext(UserContext);
  const System = useContext(SystemContext);

  const getBankModels = async () => {
    const banks = await getBanks();

    if (!banks) {
      console.log('No bank models found!');
      return;
    }

    System?.setBanks(banks);
  };

  useEffect(() => {
    getBankModels();
  }, []);

  return (
    <div id="App" className="flex flex-col mb-10 items-center">
      <BrowserRouter>
        <Routes>
          <Route
            path={baseUrl}
            element={
              User!.user.username != '???' ? (
                <HomePage />
              ) : (
                <Navigate to={baseUrl + 'login/'} />
              )
            }
          >
            <Route path="usr/feed/" element={<Feed />}></Route>
            <Route path="admin/" element={<AdminFeed />}></Route>
            <Route path="vendor/" element={<BankPage />}></Route>
          </Route>
          <Route path={baseUrl + 'login/'} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
