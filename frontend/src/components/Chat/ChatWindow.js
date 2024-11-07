// frontend/src/components/Chat/ChatWindow.js
import React, { useState, useEffect } from 'react';
import socket from '../../services/api';
import { Input, Button, Comment } from 'semantic-ui-react';

const ChatWindow = ({ sessionId, user }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!sessionId || !user) return; // Ensure sessionId and user are available

        // Join the session room
        socket.emit('joinSession', { sessionId, userId: user.id });

        // Handler for receiving new messages
        const handleNewMessage = (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);

            // If the message is not from the bot, you might want to trigger a bot response
            if (msg.user !== 'Bot') {
                // Example: You can emit an event to request a bot suggestion
                // Alternatively, handle it based on your backend implementation
                // socket.emit('requestBotSuggestion', { sessionId, message: msg.text });
            }
        };

        // Listen for 'newMessage' events from the server
        socket.on('newMessage', handleNewMessage);

        // Optionally, listen for 'botSuggestion' events if implemented
        const handleBotSuggestion = (suggestion) => {
            const botMessage = { user: 'Bot', text: suggestion, timestamp: new Date() };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        };

        socket.on('botSuggestion', handleBotSuggestion);

        // Cleanup listeners on component unmount or when dependencies change
        return () => {
            socket.off('newMessage', handleNewMessage);
            socket.off('botSuggestion', handleBotSuggestion);
        };
    }, [sessionId, user]);

    const sendMessage = () => {
        if (message.trim() !== '') {
            const msg = { user: user.username, text: message, timestamp: new Date() };
            socket.emit('chatMessage', { sessionId, message: msg });
            setMessages((prevMessages) => [...prevMessages, msg]);
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div>
            <Comment.Group>
                {messages.map((msg, index) => (
                    <Comment key={index}>
                        <Comment.Content>
                            <Comment.Author as='a'>{msg.user}</Comment.Author>
                            <Comment.Metadata>
                                <div>{new Date(msg.timestamp).toLocaleTimeString()}</div>
                            </Comment.Metadata>
                            <Comment.Text>{msg.text}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                ))}
            </Comment.Group>
            <Input
                fluid
                placeholder='Type your message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                action={
                    <Button color='blue' onClick={sendMessage}>
                        Send
                    </Button>
                }
            />
        </div>
    );
};

export default ChatWindow;
