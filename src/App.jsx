import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import InitialPage from './pages/InitialPage';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={token ? <ChatPage /> : <InitialPage />} />
      <Route path="/auth/:authType" element={<AuthPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
