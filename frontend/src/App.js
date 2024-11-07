// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import { GamesProvider } from './components/Games/GamesContext'; // <-- Games Provider
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';
import PrivateRoute from './components/Auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import CalendarPage from './pages/CalendarPage';
import GamesPage from './pages/GamesPage';       // <-- Games Page
import GameDetail from './components/Games/GameDetail';
import PlayGame from './components/Games/PlayGame';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <AuthProvider>
      <GamesProvider> {/* Wrap with GamesProvider */}
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
            <PrivateRoute exact path="/games/:id" component={GameDetail} />
            <PrivateRoute exact path="/games/:id/play" component={PlayGame} />
            <PrivateRoute path="/logout" component={Logout} />

            {/* 404 Not Found */}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </GamesProvider>
    </AuthProvider>
  );
};

export default App;
