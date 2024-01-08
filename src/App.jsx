import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import InitialPage from './pages/InitialPage';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import './App.css';

const App = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={token ? <ChatPage /> : <InitialPage />} />
      <Route path="/:authType" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
