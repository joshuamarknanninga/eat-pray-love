// backend/testEnv.js

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);
console.log('YOUTUBE_API_KEY:', process.env.YOUTUBE_API_KEY);
