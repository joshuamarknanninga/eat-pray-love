// frontend/src/components/Auth/PrivateRoute.js

import React, { useContext } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

// A wrapper for <Route> that redirects to the login screen if you're not authenticated.
const PrivateRoute = ({ element: Component, ...rest }) => {
  const { authState } = useContext(AuthContext);
  const location = useLocation(); // Get the current location

  if (authState.loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loader component
  }

  return (
    <Route
      {...rest}
      element={
        authState.user ? (
          <Component />
        ) : (
          <Navigate
            to="/login"
            state={{ from: location }} // Use location to pass current location
          />
        )
      }
    />
  );
};

export default PrivateRoute;

