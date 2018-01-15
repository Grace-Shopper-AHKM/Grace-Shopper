import axios from 'axios';

const GET_BOOKS = 'GET_BOOKS';
const SEARCH_BOOKS = 'SEARCH_BOOKS';
const DELETE_BOOK = 'DELETE_BOOK';

export function getBooks(books) {
    return {
        type: GET_BOOKS,
        books
    }
}

export function searchBooks(searchTerm) {
    return {
        type: SEARCH_BOOKS,
        searchTerm
    }
}

export function deleteBook(book) {
  return {
    type: DELETE_BOOK,
    book
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

export function searchAllBooks(searchTerm) {
    return function thunk(dispatch) {
        return axios.get('/api/books')
            .then(res => res.data)
            .then(books => dispatch(searchBooks(searchTerm)))
            .catch(console.error);
    }
}

export function fetchBooksByGenre(genre) {
    return function thunk(dispatch) {
        return axios.get(`/api/books?genre=${genre}`)
            .then(res => res.data)
            .then(books => dispatch(getBooks(books)))
            .catch(console.error);
    }
}

export function deleteBookFromDB(book) {
  return function thunk(dispatch) {
    return axios.delete(`/api/books/${book.id}/delete`)
      .then(() => dispatch(deleteBook(book)))
  }
}

export default function booksReducer(state = [], action) {
    switch (action.type) {
        case GET_BOOKS:
            return action.books;
        case SEARCH_BOOKS:
            return state.filter((book) => book.title.toLowerCase().includes(action.searchTerm.toLowerCase()));
        case DELETE_BOOK:
          return state.filter(book => {
            return book.id !== action.book.id;
          })
        default:
            return state;
    }
}