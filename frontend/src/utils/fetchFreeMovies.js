// frontend/src/utils/fetchFreeMovies.js

import axios from 'axios';

/**
 * Fetches free movies from the backend API.
 * @returns {Promise<Array>} An array of movie objects.
 */
const fetchFreeMovies = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/movies/free'); // Adjust if necessary
    return response.data.movies; // Adjust based on backend response structure
  } catch (error) {
    console.error('Error fetching free movies:', error);
    throw error;
  }
};

export default fetchFreeMovies;
