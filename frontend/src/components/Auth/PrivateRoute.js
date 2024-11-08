// frontend/src/components/Auth/PrivateRoute.js

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// A wrapper for <Route> that redirects to the login screen if you're not authenticated.
const PrivateRoute = ({ children }) => {
  const { authState } = useAuth();
  const location = useLocation();

  if (authState.loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loader component
  }

  if (!authState.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

