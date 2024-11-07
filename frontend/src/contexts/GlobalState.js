// frontend/src/contexts/GlobalState.js

import React from 'react';

// Import individual context providers
import { AuthProvider } from '../components/Auth/AuthContext';
import { MoviesProvider } from '../components/Movies/MoviesContext';
import { CalendarProvider } from './CalendarContext';
// Import other context providers as needed

/**
 * GlobalState Component
 * Wraps children with all necessary context providers.
 */
const GlobalState = ({ children }) => {
  return (
    <AuthProvider>
      <MoviesProvider>
        <CalendarProvider>
          {/* Add other providers here as needed */}
          {children}
        </CalendarProvider>
      </MoviesProvider>
    </AuthProvider>
  );
};

export default GlobalState;
