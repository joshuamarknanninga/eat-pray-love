// utils/youtubeAPI.js

const axios = require('axios');

const API_KEY = process.env.AIzaSyAchsPty1f9PcgGQNsYrePqaikbbrtqUyM; // Ensure you have this key in your .env file

const fetchFreeMovies = async () => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        type: 'video',
        videoType: 'movie',
        q: 'full movie', // Adjust query as needed
        maxResults: 20,
        key:  AIzaSyAchsPty1f9PcgGQNsYrePqaikbbrtqUyM,
      },
    });

    const movies = response.data.items;
    return movies;
  } catch (error) {
    console.error('Error fetching free movies:', error);
    throw error;
  }
};

module.exports = {
  fetchFreeMovies,
};
