import axios from 'axios';

const GET_FILTERED_BOOKS = 'GET_FILTERED_BOOKS';
const TOTAL_BOOKS = 'TOTAL_BOOKS';

export function fetchFilteredBooks(books, searchTerm) {
    return {
        type: GET_FILTERED_BOOKS,
        books,
        searchTerm
    }
};

export function getTotalBooks(books) {
    return {
        type: TOTAL_BOOKS,
        books
    }
};

export function fetchTotalBooks() {
    return function thunk(dispatch) {
        return axios.get('/api/books')
            .then(res => res.data)
            .then(books => dispatch(getTotalBooks(books)))
            .catch(console.error);
    }
}

export default function searchFilter(state = [], action) {
    switch (action.type) {
        case GET_FILTERED_BOOKS:
            return action.books.filter((book) => book.title.toLowerCase().includes(action.searchTerm.toLowerCase()));
        case TOTAL_BOOKS:
            return action.books;
        default:
            return state;
    }
}