import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL + '/api/books/';

export const getBooks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addBook = async (bookData) => {
    const response = await axios.post(API_URL, bookData);
    return response.data;
};

// Add other CRUD functions (updateBook, deleteBook) as needed
