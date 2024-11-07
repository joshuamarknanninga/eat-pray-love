// frontend/src/components/Auth/Register.js

import React, { useState, useContext } from 'react';
import { Form, Button, Message, Segment } from 'semantic-ui-react';
import { AuthContext } from './AuthContext';
import { useHistory, Redirect } from 'react-router-dom';

const Register = () => {
  const { authState, register } = useContext(AuthContext);
  const history = useHistory();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  if (authState.user) {
    return <Redirect to="/dashboard" />;
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    const { username, email, password, confirmPassword } = userData;

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    const res = await register({ username, email, password });
    if (res.success) {
      history.push('/dashboard');
    } else {
      setError(res.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Segment padded="very">
      <Form onSubmit={handleSubmit} error={!!error}>
        <Form.Input
          label="Username"
          placeholder="Enter your username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Email"
          placeholder="Enter your email"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm your password"
          name="confirmPassword"
          type="password"
          value={userData.confirmPassword}
          onChange={handleChange}
          required
        />
        {error && <Message error header="Registration Failed" content={error} />}
        <Button type="submit" primary fluid>
          Register
        </Button>
      </Form>
    </Segment>
  );
};

export default Register;
