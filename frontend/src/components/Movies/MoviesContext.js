// frontend/src/components/Movies/MoviesContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Movies Context
export const MoviesContext = createContext();

// Movies Provider Component
export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all movies from the backend
  const fetchMovies = async () => {
    try {
      const res = await axios.get('/api/movies');
      setMovies(res.data.movies);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  // Fetch user's favorite movies (optional: implement backend route)
  const fetchFavorites = async () => {
    try {
      const res = await axios.get('/api/users/favorites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFavorites(res.data.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchFavorites();
  }, []);

  // Create a new movie
  const createMovie = async (movieData) => {
    try {
      const formData = new FormData();
      formData.append('title', movieData.title);
      formData.append('description', movieData.description);
      formData.append('releaseDate', movieData.releaseDate);
      formData.append('genre', movieData.genre);
      if (movieData.poster) {
        formData.append('poster', movieData.poster);
      }

      const res = await axios.post('/api/movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMovies([res.data.movie, ...movies]);
      return { success: true };
    } catch (error) {
      console.error('Error creating movie:', error.response.data);
      return { success: false, message: error.response.data.message };
    }
  };

  // Update an existing movie
  const updateMovie = async (movieId, updatedData) => {
    try {
      const formData = new FormData();
      formData.append('title', updatedData.title);
      formData.append('description', updatedData.description);
      formData.append('releaseDate', updatedData.releaseDate);
      formData.append('genre', updatedData.genre);
      if (updatedData.poster) {
        formData.append('poster', updatedData.poster);
      }

      const res = await axios.put(`/api/movies/${movieId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMovies(movies.map(movie => movie._id === movieId ? res.data.movie : movie));
      return { success: true };
    } catch (error) {
      console.error('Error updating movie:', error.response.data);
      return { success: false, message: error.response.data.message };
    }
  };

  // Delete a movie
  const deleteMovie = async (movieId) => {
    try {
      await axios.delete(`/api/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMovies(movies.filter(movie => movie._id !== movieId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting movie:', error.response.data);
      return { success: false, message: error.response.data.message };
    }
  };

  // Add to favorites
  const addToFavorites = async (movieId) => {
    try {
      const res = await axios.post(`/api/users/favorites/${movieId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFavorites([...favorites, res.data.movie]);
      return { success: true };
    } catch (error) {
      console.error('Error adding to favorites:', error.response.data);
      return { success: false, message: error.response.data.message };
    }
  };

  // Remove from favorites
  const removeFromFavorites = async (movieId) => {
    try {
      await axios.delete(`/api/users/favorites/${movieId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFavorites(favorites.filter(movie => movie._id !== movieId));
      return { success: true };
    } catch (error) {
      console.error('Error removing from favorites:', error.response.data);
      return { success: false, message: error.response.data.message };
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        favorites,
        selectedMovie,
        setSelectedMovie,
        loading,
        createMovie,
        updateMovie,
        deleteMovie,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
