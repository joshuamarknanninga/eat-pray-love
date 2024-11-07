// frontend/src/components/Chat/ChatWindow.js
import React, { useState, useEffect } from 'react';
import socket from '../../services/api';
import { Input, Button, Comment } from 'semantic-ui-react';

const ChatWindow = ({ sessionId, user }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Join the session room
        socket.emit('joinSession', { sessionId, userId: user.id });

        // Listen for new messages
        socket.on('newMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('newMessage');
        };
    }, [sessionId, user.id]);

    const sendMessage = () => {
        if(message.trim() !== ''){
            const msg = { user: user.username, text: message, timestamp: new Date() };
            socket.emit('chatMessage', { sessionId, message: msg });
            setMessages((prevMessages) => [...prevMessages, msg]);
            setMessage('');
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
