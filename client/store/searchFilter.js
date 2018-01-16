import axios from 'axios';

const GET_FILTERED_BOOKS = 'GET_FILTERED_BOOKS';
const GENRE_FILTER = 'GENRE_FILTER';
const TOTAL_BOOKS = 'TOTAL_BOOKS';
const DELETE_BOOK = 'DELETE_BOOK';
const ADD_BOOK = 'ADD_BOOK';

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

export function genreFilter(books) {
    return {
        type: GENRE_FILTER,
        books
    }
}

export function deleteBook(book) {
    return {
      type: DELETE_BOOK,
      book
    }
  }
  
  export function addBook(book) {
    return {
      type: ADD_BOOK,
      book
    }
  }

export function fetchTotalBooks() {
    return function thunk(dispatch) {
        return axios.get('/api/books')
            .then(res => res.data)
            .then(books => dispatch(getTotalBooks(books)))
            .catch(console.error);
    }
}

export function fetchBooksByGenre(genre) {
    return function thunk(dispatch) {
        return axios.get(`/api/books?genre=${genre}`)
            .then(res => res.data)
            .then(books => dispatch(genreFilter(books)))
            .catch(console.error);
    }
}

  export function deleteBookFromDB(book) {
    return function thunk(dispatch) {
      return axios.delete(`/api/books/${book.id}/delete`)
        .then(() => dispatch(deleteBook(book)))
        .catch(console.error)
    }
  }

export default function searchFilter(state = [], action) {
    switch (action.type) {
        case GET_FILTERED_BOOKS:
            return action.books.filter((book) => book.title.toLowerCase().includes(action.searchTerm.toLowerCase()));
        case GENRE_FILTER:
            return action.books;
        case TOTAL_BOOKS:
            return action.books;
            case DELETE_BOOK:
            return state.filter(book => {
              return book.id !== action.book.id;
            })
          case ADD_BOOK:
            return state.filter(book => {
              return book.id !== action.book.id
            }).concat([action.book])
        default:
            return state;
    }
}