// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import { MoviesProvider } from './components/Movies/MoviesContext';
import { CalendarProvider } from './contexts/CalendarContext'; // <-- Import CalendarProvider
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';
import PrivateRoute from './components/Auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import CalendarPage from './components/Calendar/CalendarPage';
import GamesPage from './pages/GamesPage';
import MoviesPage from './pages/MoviesPage';
import NotFound from './pages/NotFound';
import PlayGame from './components/Games/PlayGame';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <AuthProvider>
      <MoviesProvider>
        <CalendarProvider> {/* Wrap with CalendarProvider */}
          <Router>
            <Switch>
              {/* Public Routes */}
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />

              {/* Protected Routes */}
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/calendar" component={CalendarPage} />
              <PrivateRoute exact path="/games" component={GamesPage} />
              <PrivateRoute exact path="/games/:id/play" component={PlayGame} />
              <PrivateRoute exact path="/movies" component={MoviesPage} />
              <PrivateRoute exact path="/logout" component={Logout} />

              {/* 404 Not Found */}
              <Route component={NotFound} />
            </Switch>
          </Router>
          <ToastContainer /> {/* Toast Notifications */}
        </CalendarProvider>
      </MoviesProvider>
    </AuthProvider>
  );
};

export default App;
