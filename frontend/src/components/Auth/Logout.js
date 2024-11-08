// frontend/src/components/Auth/Logout.js

import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const { setAuthState } = useAuth();;

  return <Navigate to="/login" />;
};

export default Logout;
