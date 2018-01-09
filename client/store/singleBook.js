import axios from 'axios';

const GET_BOOK = 'GET_BOOK';

export function getBook(book) {
    return {
        type: GET_BOOK,
        book
    }
}

export function fetchBook(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/books/${id}`)
            .then(res => res.data)
            .then(book => dispatch(getBook(book)))
            .catch(console.error);
    }
}

export default function bookReducer(state = {}, action) {
    switch (action.type) {
        case GET_BOOK:
            return action.book;
        default:
            return state;
    }
}