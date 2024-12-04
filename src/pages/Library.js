import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';

const Library = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editBookId, setEditBookId] = useState(null); // Track the book being edited

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/books');
            setBooks(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching books:", error);
            setLoading(false);
        }
    };

    const handleAddOrUpdateBook = async (e) => {
        e.preventDefault();

        try {
            if (editBookId) {
                // Update existing book
                const response = await axios.put(`http://localhost:5000/api/books/${editBookId}`, { title, author });
                setBooks(books.map((book) => (book._id === editBookId ? response.data : book)));
                setEditBookId(null); // Reset edit mode
            } else {
                // Add new book
                const response = await axios.post('http://localhost:5000/api/books', { title, author });
                setBooks([...books, response.data]);
            }
            setTitle('');
            setAuthor('');
        } catch (error) {
            console.error("Error adding/updating book:", error);
        }
    };

    const handleEditClick = (book) => {
        setEditBookId(book._id);
        setTitle(book.title);
        setAuthor(book.author);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/books/${id}`);
            setBooks(books.filter((book) => book._id !== id));
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                Library
            </Typography>
            <Box component="form" onSubmit={handleAddOrUpdateBook} sx={{ mb: 4 }}>
                <TextField
                    label="Book Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Author"
                    variant="outlined"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">
                    {editBookId ? 'Update Book' : 'Add Book'}
                </Button>
            </Box>

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
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleEditClick(book)}
                                    sx={{ ml: 2 }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDeleteClick(book._id)}
                                    sx={{ ml: 2 }}
                                >
                                    Delete
                                </Button>
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
