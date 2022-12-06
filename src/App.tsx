import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import BankPage from './Pages/Bank/BankPage';
import Feed from './Pages/Home/Feed/Feed';
import HomePage from './Pages/Home/HomePage';
import Login from './Pages/Login/Login';
import { baseUrl } from './util/systemConfig';

function App() {
  const User = useContext(UserContext);

  return (
    <div id="App" className="flex flex-col mb-10 items-center">
      <BrowserRouter>
        <Routes>
          <Route
            path={baseUrl}
            element={
              User?.user.username != '???' ? (
                <HomePage />
              ) : (
                <Navigate to={baseUrl + 'login/'} />
              )
            }
          >
            <Route path="usr/feed/" element={<Feed />}></Route>
            <Route path="vendor/" element={<BankPage />}></Route>
          </Route>
          <Route path={baseUrl + 'login/'} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
