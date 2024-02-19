import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({
  token: null,
  signIn: () => {},
  signUp: () => {},
});

const getTokenWithExpiry = () => {
  const itemStr = localStorage.getItem('token');
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem('token');
    return null;
  }

  return item.value;
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getTokenWithExpiry());

  const signIn = (newToken, expirationInMinutes = 360) => {
    const now = new Date();
    const expirationTime = now.getTime() + expirationInMinutes * 60 * 1000;
    const tokenWithExpiry = {
      value: newToken,
      expiry: expirationTime,
    };

    localStorage.setItem('token', JSON.stringify(tokenWithExpiry));
    setToken(newToken);
  };

  const signOut = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  /* eslint-disable react/jsx-no-constructed-context-values */
  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
