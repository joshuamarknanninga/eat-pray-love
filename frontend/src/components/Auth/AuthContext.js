// src/contexts/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component that wraps your app and makes auth object available to any child component that calls useAuth().
export const AuthProvider = ({ children }) => {
  // State to hold authentication information
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
  });

  // Function to register a new user
  const register = async ({ username, email, password }) => {
    try {
      // Replace '/api/register' with your actual API endpoint
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        setAuthState({ user: data.user, isAuthenticated: true });
        return { success: true };
      } else {
        // Registration failed
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Function to log in a user
  const login = async ({ email, password }) => {
    try {
      // Replace '/api/login' with your actual API endpoint
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        setAuthState({ user: data.user, isAuthenticated: true });
        return { success: true };
      } else {
        // Login failed
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Function to log out a user
  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
  };

  // Persist auth state using localStorage
  useEffect(() => {
    const storedAuthState = JSON.parse(localStorage.getItem('authState'));
    if (storedAuthState && storedAuthState.isAuthenticated) {
      setAuthState(storedAuthState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authState, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext and access authState, register, login, and logout
export const useAuth = () => useContext(AuthContext);
