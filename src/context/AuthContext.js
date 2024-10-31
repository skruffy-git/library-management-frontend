import React, { createContext, useState, useEffect } from 'react';
import { getUserFromLocalStorage } from '../utils/localStorage'; // Utility function to get user data from localStorage

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUserFromLocalStorage());

    useEffect(() => {
        if (user) {
            // You might want to fetch user details if needed
        }
    }, [user]);

    const login = (userData) => {
        setUser(userData);
        // Save user data to localStorage
    };

    const logout = () => {
        setUser(null);
        // Remove user data from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
