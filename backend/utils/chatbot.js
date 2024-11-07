// backend/utils/chatbot.js
const axios = require('axios');
require('dotenv').config();

const processMessage = async (sessionId, message) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: message.text }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const suggestion = response.data.choices[0].message.content;
        // Emit suggestion back to the session
        // Assuming you have access to io instance
        // This might require restructuring for proper access
    } catch (error) {
        console.error('Error with OpenAI API:', error);
    }
};

module.exports = { processMessage };
