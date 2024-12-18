// frontend/src/components/Auth/Register.js

import React, { useState } from 'react';
import { Form, Button, Message, Segment } from 'semantic-ui-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const Register = () => {
  const { authState, register } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  if (authState.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { username, email, password, confirmPassword } = userData;

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    const res = await register({ username, email, password });
    if (res.success) {
      navigate('/dashboard');
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
