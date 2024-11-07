// frontend/src/components/Auth/PrivateRoute.js

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext';

// A wrapper for <Route> that redirects to the login screen if you're not authenticated.
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authState } = useContext(AuthContext);

  if (authState.loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loader component
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        authState.user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
