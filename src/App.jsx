import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import InitialPage from './pages/InitialPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import './App.css';

function App() {
  const { token } = useAuth();
  
  return (
    <Routes>
      {token ? 
          <Route path="/" element={<ChatPage />} /> :
        <>
          <Route path="/:authType" element={<AuthPage />} />
          <Route path="/" element={<InitialPage />} />
        </>
      }
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
