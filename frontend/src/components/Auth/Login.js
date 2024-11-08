// frontend/src/components/Auth/Login.js
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const { login } = useAuth();

    const handleLogin = () => {
        // Example login logic
        login({ username });
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
