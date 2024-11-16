// backend/controllers/youtubeController.js

const axios = require('axios');

exports.getFreeMovies = async (req, res) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY; // Correctly access the API key from environment variables
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 50,
        q: 'full movies',
        type: 'video',
        videoDuration: 'long',
        videoLicense: 'creativeCommon',
        key: apiKey,
      },
    });

    res.json(response.data.items);
  } catch (error) {
    // Error handling moved to the catch block
    if (error.response) {
      res.status(error.response.status).json({ message: error.response.data.error.message });
    } else {
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
};
