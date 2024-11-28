import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import logo from '../assets/image.png'; // Import the logo from the assets folder

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="lg" className="home-container">
            {/* Logo and Hero Section */}
            <Box className="hero-section">
                <img src={logo} alt="Codex Logo" className="logo" />
                <Typography variant="h2" component="h1" className="hero-title">
                    Welcome to the Codex Library Management System
                </Typography>
                <Typography variant="h5" component="h2" className="hero-subtitle">
                    Your ultimate solution for managing library resources efficiently and effortlessly.
                </Typography>
                <Box className="button-group">
                    <Button className="get-started-btn" onClick={() => navigate('/library')} variant="contained">
                        Get Started
                    </Button>
                    <Button
                        className="register-btn"
                        onClick={() => navigate('/register')}
                        variant="outlined"
                    >
                        Register Now
                    </Button>
                </Box>
            </Box>

            {/* Features Section */}
            <Box className="features-section">
                <Box className="feature-card" data-aos="fade-up">
                    <Typography variant="h6" className="feature-title">
                        Manage Books
                    </Typography>
                    <Typography className="feature-description">
                        Keep track of book inventory, add new titles, and update book details with ease.
                    </Typography>
                </Box>
                <Box className="feature-card" data-aos="fade-up" data-aos-delay="200">
                    <Typography variant="h6" className="feature-title">
                        User Management
                    </Typography>
                    <Typography className="feature-description">
                        Seamlessly manage library members, track borrowing history, and monitor activity.
                    </Typography>
                </Box>
                <Box className="feature-card" data-aos="fade-up" data-aos-delay="400">
                    <Typography variant="h6" className="feature-title">
                        Reporting & Analytics
                    </Typography>
                    <Typography className="feature-description">
                        Gain insights with detailed reports and analytics to optimize library performance.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
