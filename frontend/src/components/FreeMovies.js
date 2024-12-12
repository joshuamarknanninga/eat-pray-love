// frontend/src/components/FreeMovies.js

import React, { useEffect, useState } from 'react';
import fetchFreeMovies from '../utils/fetchFreeMovies';

const FreeMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movieList = await fetchFreeMovies();
        setMovies(movieList);
      } catch (err) {
        setError('Failed to fetch movies.');
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Free Movies on YouTube</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id.videoId} className="movie-item">
            <img src={movie.snippet.thumbnails.medium.url} alt={movie.snippet.title} />
            <h3>{movie.snippet.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeMovies;
