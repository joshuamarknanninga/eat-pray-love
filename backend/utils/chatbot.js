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
                'Authorization': `Bearer ${process.env.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}`,
                'Content-Type': 'application/json'
            }
        });

        // Extract the suggestion from OpenAI's response
        const suggestion = response.data.choices[0].message.content.trim();
        return suggestion;
    } catch (error) {
        console.error('Error with OpenAI API:', error);
    }
};

module.exports = { processMessage };
