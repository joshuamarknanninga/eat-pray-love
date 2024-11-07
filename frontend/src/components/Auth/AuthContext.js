// frontend/src/components/Auth/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Auth Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    user: null,
    loading: true,
  });

  // Fetch user data if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (authState.token) {
        try {
          const res = await axios.get('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          });
          setAuthState({
            ...authState,
            user: res.data.user,
            loading: false,
          });
        } catch (error) {
          console.error('Error fetching user:', error);
          logout();
        }
      } else {
        setAuthState({ ...authState, loading: false });
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const res = await axios.post('/api/auth/login', credentials);
      localStorage.setItem('token', res.data.token);
      setAuthState({
        ...authState,
        token: res.data.token,
        user: res.data.user,
        loading: false,
      });
      return { success: true };
    } catch (error) {
      console.error('Login error:', error.response.data);
      return { success: false, message: error.response.data.message };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      setAuthState({
        ...authState,
        token: res.data.token,
        user: res.data.user,
        loading: false,
      });
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error.response.data);
      return { success: false, message: error.response.data.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      token: null,
      user: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
