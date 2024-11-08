// frontend/src/contexts/AuthContext.js

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null,
  });

    const login = (userData) => {
        setAuthState(userData);
    };

    const logout = () => {
        setAuthState(null);
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
