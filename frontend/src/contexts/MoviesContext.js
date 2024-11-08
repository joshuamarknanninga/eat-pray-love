// frontend/src/contexts/MoviesContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the MoviesContext
export const MoviesContext = createContext();

// Create the MoviesProvider component
export const MoviesProvider = ({ children }) => {
  // State variables
  const [movies, setMovies] = useState([]); // All movies
  const [favoriteMovies, setFavoriteMovies] = useState([]); // User's favorite movies
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch movies from the backend when the component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/movies');
        setMovies(response.data);

        // Optionally, set favorite movies if they are indicated in the data
        const favorites = response.data.filter((movie) => movie.isFavorite);
        setFavoriteMovies(favorites);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Function to add a movie to favorites
  const addFavorite = async (movieId) => {
    try {
      const response = await axios.post(`/api/movies/${movieId}/favorite`);
      const updatedMovie = response.data;

      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === movieId ? updatedMovie : movie
        )
      );

      setFavoriteMovies((prevFavorites) => [...prevFavorites, updatedMovie]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add favorite');
    }
  };

  // Function to remove a movie from favorites
  const removeFavorite = async (movieId) => {
    try {
      await axios.delete(`/api/movies/${movieId}/favorite`);

      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === movieId ? { ...movie, isFavorite: false } : movie
        )
      );

      setFavoriteMovies((prevFavorites) =>
        prevFavorites.filter((movie) => movie._id !== movieId)
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove favorite');
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        favoriteMovies,
        loading,
        error,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
