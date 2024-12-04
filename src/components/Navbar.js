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
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: '#1e3a8a', // A deep, modern blue color
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                padding: '0.5rem 1rem',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {/* Website Title */}
                <Typography
                    variant="h5"
                    component={Link}
                    to="/"
                    sx={{
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto, sans-serif',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    Codex Library
                </Typography>

                {/* Navigation Links */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: '1.5rem',
                    }}
                >
                    <Button
                        component={Link}
                        to="/library"
                        sx={{
                            color: 'white',
                            fontSize: '1rem',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                        }}
                    >
                        Library
                    </Button>

                    {user ? (
                        <Button
                            onClick={handleLogout}
                            sx={{
                                color: 'white',
                                fontSize: '1rem',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={handleMenuOpen}
                                sx={{
                                    color: 'white',
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                Account
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                sx={{
                                    marginTop: '0.5rem',
                                }}
                            >
                                <MenuItem
                                    component={Link}
                                    to="/login"
                                    onClick={handleMenuClose}
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Login
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/register"
                                    onClick={handleMenuClose}
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Register
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
