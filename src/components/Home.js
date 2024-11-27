// src/components/Home.js

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 4 }} className="container">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="home-banner">
                    <Typography variant="h2" component="h1" gutterBottom className="home-title">
                        Welcome to the Codex Library Management System
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom className="home-subtitle">
                        Manage your library efficiently and easily.
                    </Typography>
                </div>
                <Button variant="contained" className="button" onClick={() => navigate('/get-started')}>Get Started</Button>
            </Box>
        </Container>
    );
};

export default Home;
