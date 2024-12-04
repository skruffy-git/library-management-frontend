import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const ReportingAnalytics = () => {
    const [summary, setSummary] = useState({});
    const [borrowingTrends, setBorrowingTrends] = useState([]);
    const [genreDistribution, setGenreDistribution] = useState([]);

    useEffect(() => {
        fetchSummary();
        fetchBorrowingTrends();
        fetchGenreDistribution();
    }, []);

    const fetchSummary = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reports/summary');
            setSummary(response.data);
        } catch (error) {
            console.error('Error fetching summary data:', error);
        }
    };

    const fetchBorrowingTrends = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reports/trends');
            setBorrowingTrends(response.data);
        } catch (error) {
            console.error('Error fetching borrowing trends:', error);
        }
    };

    const fetchGenreDistribution = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reports/genres');
            setGenreDistribution(response.data);
        } catch (error) {
            console.error('Error fetching genre distribution:', error);
        }
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Chart colors

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                Reporting & Analytics
            </Typography>

            {/* Summary Section */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6">Summary</Typography>
                <Typography>Total Books: {summary.totalBooks || 0}</Typography>
                <Typography>Total Borrowed Books: {summary.borrowedBooks || 0}</Typography>
                <Typography>Active Users: {summary.activeUsers || 0}</Typography>
            </Paper>

            {/* Borrowing Trends Chart */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Borrowing Trends</Typography>
                <BarChart width={600} height={300} data={borrowingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="borrowedBooks" fill="#0088FE" />
                </BarChart>
            </Box>

            {/* Genre Distribution Chart */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Genre Distribution</Typography>
                <PieChart width={400} height={300}>
                    <Pie
                        data={genreDistribution}
                        dataKey="value"
                        nameKey="genre"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {genreDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </Box>
        </Container>
    );
};

export default ReportingAnalytics;
