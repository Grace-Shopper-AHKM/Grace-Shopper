import axios from 'axios';

const GET_BOOKS = 'GET_BOOKS';

export function getBooks(books) {
    return {
        type: GET_BOOKS,
        books
    }
}

export function fetchAllBooks() {
    return function thunk(dispatch) {
        return axios.get('/api/books')
            .then(res => res.data)
            .then(books => dispatch(getBooks(books)))
            .catch(console.error);
    }
}

export default function booksReducer(state = [], action) {
    switch (action.type) {
        case GET_BOOKS:
            return action.books;
        default:
            return state;
    }
}
