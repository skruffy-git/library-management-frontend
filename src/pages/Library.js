import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/library.css'; // Import custom CSS for styling

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
            console.error('Error fetching books:', error);
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
            console.error('Error adding book:', error);
        }
    };

    return (
        <div className="library-container">
            {/* Page Title */}
            <h1 className="page-title">Library Management</h1>

            {/* Add Book Form */}
            <div className="form-container">
                <h2 className="form-title">Add a New Book</h2>
                <form onSubmit={handleAddBook} className="add-book-form">
                    <input
                        type="text"
                        placeholder="Book Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="form-input"
                    />
                    <button type="submit" className="add-book-btn">Add Book</button>
                </form>
            </div>

            {/* Book List */}
            <h2 className="book-list-title">Book List</h2>
            <div className="book-list-container">
                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading books...</p>
                    </div>
                ) : (
                    <ul className="book-list">
                        {books.map((book) => (
                            <li key={book._id} className="book-item">
                                <div className="book-text">
                                    <strong>{book.title}</strong>
                                    <p>Author: {book.author}</p>
                                </div>
                                <hr className="divider" />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Library;
