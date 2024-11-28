import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/bookService'; // This service should handle API calls

const BookList = ({ books }) => {
    return (
        <div
            style={{
                padding: '2rem',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
            className="book-list container"
        >
            <h1>Book List</h1>
            {books && books.length > 0 ? (
                <ul>
                    {books.map((book, index) => (
                        <li key={index}>
                            <strong>{book.title}</strong> by {book.author}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books available.</p>
            )}
        </div>
    );
};

export default BookList;