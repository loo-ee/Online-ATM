import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminContextProvider from './contexts/AdminContext';
import SystemContextProvider from './contexts/SystemContext';
import UserContextProvider from './contexts/UserContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <UserContextProvider>
    <AdminContextProvider>
      <SystemContextProvider>
        <App />
      </SystemContextProvider>
    </AdminContextProvider>
  </UserContextProvider>
  // </React.StrictMode>
);
