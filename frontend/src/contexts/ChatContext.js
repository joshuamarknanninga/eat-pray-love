// frontend/src/contexts/ChatContext.js

import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

// Create the ChatContext
export const ChatContext = createContext();

// ChatContext Provider Component
const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket'],
    });
    setSocket(newSocket);

    // Clean up on unmount
    return () => newSocket.close();
  }, []);

  // Listen for incoming messages
  useEffect(() => {
    if (socket) {
      socket.on('chat message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    // Clean up the listener on unmount or when socket changes
    return () => {
      if (socket) {
        socket.off('chat message');
      }
    };
  }, [socket]);

  // Function to send a message
  const sendMessage = (message) => {
    if (socket) {
      socket.emit('chat message', message);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
