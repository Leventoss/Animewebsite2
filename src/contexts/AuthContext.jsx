// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, register, logout, verifyToken } from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = await verifyToken(token);
        setUser(userData);
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const handleLogin = async (email, password) => {
    const { token, user: userData } = await login(email, password);
    localStorage.setItem('token', token);
    setUser(userData);
    return userData;
  };

  const handleRegister = async (username, email, password, captchaToken) => {
    const { token, user: userData } = await register(username, email, password, captchaToken);
    localStorage.setItem('token', token);
    setUser(userData);
    return userData;
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};