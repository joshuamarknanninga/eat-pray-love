import React, { useEffect, useState } from 'react';
import fetchFreeMovies from '../utils/fetchFreeMovies';

const FreeMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const movieList = await fetchFreeMovies();
      setMovies(movieList);
    };

    getMovies();
  }, []);

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
