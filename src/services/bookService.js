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

export const updateBook = async (bookId, updatedData) => {
    const response = await axios.put(`${API_URL}${bookId}`, updatedData);
    return response.data;
};

export const deleteBook = async (bookId) => {
    const response = await axios.delete(`${API_URL}${bookId}`);
    return response.data;
};
