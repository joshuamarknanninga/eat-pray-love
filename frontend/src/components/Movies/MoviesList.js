// frontend/src/components/Movies/MoviesList.js

import React, { useContext } from 'react';
import { MoviesContext } from '../../contexts/MoviesContext';

const MoviesList = () => {
  const {
    movies,
    favoriteMovies,
    loading,
    error,
    addFavorite,
    removeFavorite,
  } = useContext(MoviesContext);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>All Movies</h2>
      {movies.map((movie) => (
        <div key={movie._id}>
          <h3>{movie.title}</h3>
          <button
            onClick={() =>
              movie.isFavorite
                ? removeFavorite(movie._id)
                : addFavorite(movie._id)
            }
          >
            {movie.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      ))}

      <h2>Your Favorite Movies</h2>
      {favoriteMovies.map((movie) => (
        <div key={movie._id}>
          <h3>{movie.title}</h3>
          <button onClick={() => removeFavorite(movie._id)}>
            Remove from Favorites
          </button>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
