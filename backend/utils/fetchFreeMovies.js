// In your component or a utility file

import axios from 'axios';

const API_KEY = ' AIzaSyAchsPty1f9PcgGQNsYrePqaikbbrtqUyM'; // Replace with your actual API key

const fetchFreeMovies = async () => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        type: 'video',
        videoType: 'movie',
        maxResults: 20,
        key:  AIzaSyAchsPty1f9PcgGQNsYrePqaikbbrtqUyM,
      },
    });

    // Process the response to extract movie details
    const movies = response.data.items;
    return movies;
  } catch (error) {
    console.error('Error fetching free movies:', error);
    return [];
  }
};

export default fetchFreeMovies;
