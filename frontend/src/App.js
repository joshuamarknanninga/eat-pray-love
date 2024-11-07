// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalState from './contexts/GlobalState'; // Import GlobalState

// Import your pages and components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';
import PrivateRoute from './components/Auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';                // Import Home Page
import CalendarPage from './pages/CalendarPage';
import MoviesPage from './pages/MoviesPage';
import GamesPage from './pages/GamesPage';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';        // Navbar component

// Import ToastContainer for notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const App = () => {
  return (
    <GlobalState>
      <Router>
        <Navbar /> {/* Optional: Include a Navbar */}
        <Switch>
          {/* Home Route */}
          <Route exact path="/" component={Home} />

          {/* Public Routes */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          {/* Protected Routes */}
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/calendar" component={CalendarPage} />
          <PrivateRoute exact path="/movies" component={MoviesPage} />
          <PrivateRoute exact path="/games" component={GamesPage} />
          <PrivateRoute path="/logout" component={Logout} />

          {/* 404 Not Found */}
          <Route component={NotFound} />
        </Switch>
      </Router>
      <ToastContainer /> {/* Toast Notifications */}
    </GlobalState>
  );
};

export default App;
