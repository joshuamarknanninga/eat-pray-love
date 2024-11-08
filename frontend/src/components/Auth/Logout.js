// frontend/src/components/Auth/Logout.js

import React, { useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Navigate to="/login" />;
};

export default Logout;
