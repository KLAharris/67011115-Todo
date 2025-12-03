// frontend/src/components/Login.js
import React, { useState } from 'react';

// -----------------------------------------------------------------
// ⬇️ REPLACE THE HARDCODED URL WITH THE ENVIRONMENT VARIABLE ⬇️
// -----------------------------------------------------------------
// Use import.meta.env to access environment variables exposed by
// bundlers like Vite (which uses the VITE_ prefix).
const API_URL = process.env.VITE_API_URL;

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim()) {
            setError('Please enter a username.');
            return;
        }

        try {
            // The API endpoint remains the same, but API_URL is now dynamic
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }), 
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed due to server error.');
                return;
            }

            const data = await response.json(); 

            if (data.success) {
                localStorage.setItem('todo_username', username);
                onLogin(username); 
            } else {
                setError(data.message || 'Login failed.');
            }
        } catch (err) {
            setError('Network error: Could not connect to the server.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Login (Username Only)</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login;