// src/components/Dashboard.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { logout } = useAuth();

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="body1" gutterBottom>
                Welcome to your dashboard!
            </Typography>
            <Button variant="outlined" color="secondary" onClick={logout}>
                Logout
            </Button>
        </Container>
    );
};

export default Dashboard;
