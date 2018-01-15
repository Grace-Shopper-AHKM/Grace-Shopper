import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllBooks, fetchTotalBooks, deleteBookFromDB, fetchFilteredBooks } from '../store';
import { SearchBar } from './SearchBar';
import GenreBar from './GenreBar';

class AllBooks extends Component {
    componentDidMount() {
        this.props.loadBooks();
        this.props.loadTotalBooks();
    }

    render() {
        const { books, filteredBooks, deleteBookFromDB, searchBooks, } = this.props;
        return (
            <div>
                <SearchBar books={books} searchBooks={searchBooks} />
                <GenreBar books={books} />
                <div>
                    {
                        filteredBooks.map(book => {
                            return (
                                <div key={book.id}>
                                    <img src={book.photoUrl} />
                                    <ul>
                                        <NavLink to={`/books/${book.id}`}><li>{book.title}</li></NavLink>
                                        <li>by {book.author}</li>
                                        <li>${book.price}</li>
                                        {
                                            book.inventory === 0
                                                ?
                                                <li>OUT OF STOCK</li>
                                                :
                                                null
                                        }
                                        {
                                            book.inventory !== 0 && book.inventory <= 3
                                                ?
                                                <li>Hurry! Only {book.inventory} left in stock!</li>
                                                :
                                                null
                                        }
                                    </ul>
                                    <button onClick={() => deleteBookFromDB(book)}>Delete</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        books: state.books,
        filteredBooks: state.searchFilter
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadBooks() {
            dispatch(fetchAllBooks());
        },
        loadTotalBooks() {
            dispatch(fetchTotalBooks());
        },
        deleteOneBook(book) {
            dispatch(deleteBookFromDB(book))
        },
        searchBooks(books, searchTerm) {
            dispatch(fetchFilteredBooks(books, searchTerm));
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(AllBooks));
