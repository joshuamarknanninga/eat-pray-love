// frontend/src/services/api.js
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKEND_URL, {
    transports: ['websocket']
});

// Listen for connection
socket.on('connect', () => {
    console.log('Connected to Socket.io server');
});

export default socket;
