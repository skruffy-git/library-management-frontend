import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css'; // Import custom CSS for styling

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, email, password };

        try {
            // Make a POST request to the backend register endpoint
            const response = await axios.post('http://localhost:5000/api/register', userData);
            console.log(response.data); // Log the response data (success message)
            setSuccess(true); // Set success state to true
            setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
        } catch (error) {
            console.error('Error registering user:', error.response ? error.response.data : error.message);
            setError('Registration failed. Please try again.'); // Set error message
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-title">Create an Account</h2>
                <p className="register-subtitle">Sign up to manage your library efficiently</p>
                <form onSubmit={handleSubmit} className="register-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="register-input"
                    />
                    <button type="submit" className="register-button">Register</button>
                </form>
                {success && (
                    <div className="alert success">
                        Registration successful! Redirecting to login...
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

export default Register;
