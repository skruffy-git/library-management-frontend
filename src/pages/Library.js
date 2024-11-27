// src/pages/Library.js
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';

const Library = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch books on component mount
    useEffect(() => {
        fetchBooks();
    }, []);

    // Fetch all books from the server
    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/books'); // Adjust the endpoint as necessary
            setBooks(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching books:", error);
            setLoading(false);
        }
    };

    // Handle form submission to add a new book
    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/books', { title, author });
            setBooks([...books, response.data]); // Add new book to the existing list
            setTitle('');
            setAuthor('');
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                Library
            </Typography>
            {/* Add Book Form */}
            <Box component="form" onSubmit={handleAddBook} sx={{ mb: 4 }}>
                <TextField
                    label="Book Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                    sx={{ mb: 2, backgroundColor: 'white' }}
                />
                <TextField
                    label="Author"
                    variant="outlined"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    fullWidth
                    sx={{ mb: 2, backgroundColor: 'white' }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Book
                </Button>
            </Box>
            
            {/* List of Books */}
            <Typography variant="h5" sx={{ mb: 2 }}>
                Book List
            </Typography>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <List>
                    {books.map((book) => (
                        <React.Fragment key={book._id}>
                            <ListItem>
                                <ListItemText primary={book.title} secondary={book.author} />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default Library;