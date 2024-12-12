// backend/utils/youtubeAPI.js

const axios = require('axios');

const API_KEY = process.env.YOUTUBE_API_KEY; // Correctly accessing the environment variable

const fetchFreeMovies = async () => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        type: 'video',
        videoType: 'movie',
        q: 'full movie', // Adjust query as needed
        maxResults: 20,
        key: AIzaSyAchsPty1f9PcgGQNsYrePqaikbbrtqUyM, // Use the API_KEY from environment variables
      },
    });

    return response.data.items;
  } catch (error) {
    console.error('Error fetching free movies:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = {
  fetchFreeMovies,
};
