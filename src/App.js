// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register'; // Import the Register component
import { CssBaseline } from '@mui/material'; // Add this import for global styles

const App = () => {
    return (
        <AuthProvider>
            <CssBaseline /> {/* Reset CSS and apply Material-UI's baseline styles */}
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} /> {/* Add the route for Register */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
