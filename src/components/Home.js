// src/components/Home.js

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to the Library Management System
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Manage your library efficiently and easily.
                </Typography>
                <Button 
                    variant="contained" 
                    onClick={() => navigate('/login')} 
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={() => navigate('/register')} 
                    sx={{ mt: 2, ml: 2 }}
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
