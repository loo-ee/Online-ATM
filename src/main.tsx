import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SystemContextProvider from './contexts/SystemContext';
import UserContextProvider from './contexts/UserContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <UserContextProvider>
    <SystemContextProvider>
      <App />
    </SystemContextProvider>
  </UserContextProvider>
  // </React.StrictMode>
);
