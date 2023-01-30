import { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from 'react-router-dom';
import { getBanks } from './adapter/systemAdapter';
import { validateSession, getLinkedAccounts } from './adapter/userAdapter';
import { SystemContext } from './contexts/SystemContext';
import { UserContext } from './contexts/UserContext';
import AccountCreationPage from './Pages/Admin/AccountCreationPage';
import AccountEditPage from './Pages/Admin/AccountEditPage';
import AdminFeed from './Pages/Admin/AdminFeed';
import ChangePinPage from './Pages/Admin/ChangePinPage';
import BankPage from './Pages/Bank/BankPage';
import Feed from './Pages/Home/Feed/Feed';
import HomePage from './Pages/Home/HomePage';
import Login from './Pages/Login/Login';
import Messages from './Pages/Messages/Messages';
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

  const router = createBrowserRouter(
    createRoutesFromElements(
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
        <Route path="feed/" element={<Feed />}></Route>

        <Route path="messages/" element={<Messages />} />

        <Route path="admin/" element={<AdminFeed />}>
          <Route
            path="account-creation/"
            element={<AccountCreationPage />}
          ></Route>

          <Route path="pin-change" element={<ChangePinPage />}></Route>

          <Route path="account-edit/" element={<AccountEditPage />}></Route>
        </Route>

        <Route path="vendor/" element={<BankPage />}></Route>
        <Route path={'login/'} element={<Login />} />
      </Route>
    )
  );

  return (
    <div id="App" className="flex flex-col mb-10 items-center font-primary">
      {/* <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
