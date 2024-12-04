import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Import CSS file for consistent styling

const Login = () => {
    const [identifier, setIdentifier] = useState(''); // Use a single state for username/email
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { identifier, password }; // Pass the identifier

        try {
            const response = await axios.post('http://localhost:5000/api/login', userData);
            console.log(response.data); // Log the response data
            setSuccess(true);
            setTimeout(() => navigate('/'), 2000); // Redirect to home page after 2 seconds
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error.message);
            setError('Login failed. Please check your credentials.'); // Set error message
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Welcome Back!</h2>
                <p className="login-subtitle">Log in to access your library management system</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        placeholder="Username or Email"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
                {success && (
                    <div className="alert success">
                        Login successful! Redirecting to home...
                    </div>
                )}
                {error && (
                    <div className="alert error">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
