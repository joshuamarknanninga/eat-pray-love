// frontend/src/components/Home/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Optional: Import CSS for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Eat Pray Love</h1>
      <p>
        Discover new experiences, connect with others, and explore the world through food,
        spirituality, and love.
      </p>
      <div className="home-buttons">
        <Link to="/signup" className="btn btn-primary">
          Get Started
        </Link>
        <Link to="/login" className="btn btn-secondary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
