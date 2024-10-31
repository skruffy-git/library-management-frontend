import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // For error handling

    // Check if user is already logged in when the app starts
    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const response = await axios.get('/api/auth/check'); // Replace with your backend check endpoint
                setUser(response.data.user);
            } catch (err) {
                console.error("Error checking user login status", err);
            } finally {
                setLoading(false);
            }
        };
        checkUserLoggedIn();
    }, []);

    const login = async (credentials) => {
        setError(null); // Reset error state
        try {
            const response = await axios.post('/api/login', credentials);
            setUser(response.data.user); // Set user from response
        } catch (err) {
            setError("Login failed. Please check your credentials."); // Set error message
            console.error(err);
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/logout'); // Call logout API if necessary
            setUser(null);
        } catch (err) {
            console.error("Error logging out", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
