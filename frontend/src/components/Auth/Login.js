// frontend/src/components/Auth/Login.js

import React, { useState, useContext } from 'react';
import { Form, Button, Message, Segment } from 'semantic-ui-react';
import { AuthContext } from './AuthContext';
import { useHistory, Redirect } from 'react-router-dom';

const Login = () => {
  const { authState, login } = useContext(AuthContext);
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  if (authState.user) {
    return <Redirect to="/dashboard" />;
  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    const res = await login(credentials);
    if (res.success) {
      history.push('/dashboard');
    } else {
      setError(res.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Segment padded="very">
      <Form onSubmit={handleSubmit} error={!!error}>
        <Form.Input
          label="Email"
          placeholder="Enter your email"
          name="email"
          type="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        {error && <Message error header="Login Failed" content={error} />}
        <Button type="submit" primary fluid>
          Login
        </Button>
      </Form>
    </Segment>
  );
};

export default Login;
