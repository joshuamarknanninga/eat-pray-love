// frontend/src/components/Auth/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// A wrapper for <Route> that redirects to the login screen if you're not authenticated.
const PrivateRoute = ({ children }) => {
  const { authState } = useAuth();
  const { isAuthenticated } = authState;

  if (authState.loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loader component
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

