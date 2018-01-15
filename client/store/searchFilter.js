import axios from 'axios';

const GET_FILTERED_BOOKS = 'GET_FILTERED_BOOKS';

export function getFilteredBooks(books, searchTerm) {
    return {
        type: GET_FILTERED_BOOKS,
        books,
        searchTerm
    }
};

export default function booksReducer(state = [], action) {
    switch (action.type) {
        case GET_BOOKS:
            return action.books;
        default:
            return state;
    }
}