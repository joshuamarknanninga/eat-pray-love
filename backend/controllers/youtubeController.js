// backend/controllers/youtubeController.js

const axios = require('axios');

exports.getFreeMovies = async (req, res) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
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
    console.error('Error fetching free movies:', error);
    res.status(500).json({ message: 'Failed to fetch free movies from YouTube' });
  }
};
