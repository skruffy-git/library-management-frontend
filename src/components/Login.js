// src/components/Login.js

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username or Email"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Box>
                <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                    <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                        Login successful! Redirecting to home...
                    </Alert>
                </Snackbar>
                <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
                    <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
};

export default Login;
