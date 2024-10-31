// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // State to handle the menu open/close
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Handle logout and navigate to home
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Home link (website title) */}
                <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}>
                    Library Management System
                </Typography>

                {/* Library Button */}
                <Button color="inherit" component={Link} to="/library">
                    Library
                </Button>

                {/* Login/Register or Logout based on auth state */}
                {user ? (
                    <>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" onClick={handleMenuOpen}>
                            Account
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                                Login
                            </MenuItem>
                            <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
                                Register
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
