import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const signIn = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  }

  const signOut = () => {
    setToken(null);
    localStorage.removeItem('token');
  }

  return <AuthContext.Provider value={{ token, signIn, signOut }}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useAuth = () => useContext(AuthContext);
