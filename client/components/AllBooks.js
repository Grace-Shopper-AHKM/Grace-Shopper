import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllBooks, searchAllBooks, deleteBookFromDB, fetchFilteredBooks, fetchBook, fetchTotalBooks } from '../store';
import { SearchBar } from './SearchBar';
import GenreBar from './GenreBar';
import BookForm from './BookForm';
import store, { displayForm } from '../store';

class AllBooks extends Component {

    componentDidMount() {
        this.props.loadBooks();
        this.props.loadTotalBooks();
    }

    setToEdit(id) {
        store.dispatch(displayForm(true, true, id))
    }

    setToCreate() {
        store.dispatch(displayForm(true, false))
    }

    hideForm() {
        store.dispatch(displayForm(false))
    }

    render() {
        const { books, filteredBooks, deleteBookFromDB, searchBooks } = this.props;
        return (
            <div id="all-books">
            {
                this.props.isAdmin
                ?
                (
                    <div>
                    <button onClick={this.setToCreate.bind(this)}>Add a book</button>
                    { this.props.displayForm[0] && !this.props.displayForm[1]
                        ?
                        (   <div>
                            <button onClick={this.hideForm.bind(this)}>Hide Form</button>
                            <BookForm isEdit={false} />
                            </div>
                        )
                        : null }
                    </div>
                )
                :
                null

            }

                <div id="all-books-sidebar">
                    <SearchBar books={books} searchBooks={searchBooks} />
                    <GenreBar books={books} />
                </div>
            <div id="all-books-stream">
                <h1>Our Books</h1>
                    {
                        filteredBooks.map(book => {
                            return (
                                <div key={book.id} className="all-books-book-info">
                                    <img src={book.photoUrl} className="all-books-book-block" />
                                    <div className="all-books-book-block">
                                        <NavLink to={`/books/${book.id}`}><h3>{book.title}</h3></NavLink>
                                        <h5>by {book.author}</h5>
                                        <p>${book.price / 100}</p>
                                        {
                                            book.inventory === 0
                                                ?
                                                <h4>OUT OF STOCK</h4>
                                                :
                                                null
                                        }
                                        {
                                            book.inventory !== 0 && book.inventory <= 3
                                                ?
                                                <h5>Hurry! Only {book.inventory} left in stock!</h5>
                                                :
                                                null
                                        }
                                    </div>
                                    {
                                        this.props.isAdmin
                                            ?
                                            (
                                                <div>
                                                    <button key="2" onClick={this.setToEdit.bind(this, book.id)}>Edit</button>
                                                    <button key="1" onClick={() => this.props.deleteOneBook(book)}>Delete</button>
                                                    {
                                                        this.props.displayForm[0] && this.props.displayForm[1]
                                                        ?
                                                        <button onClick={this.hideForm.bind(this)}>Hide Form</button>
                                                        :
                                                        null
                                                    }
                                                </div>
                                            )
                                            :
                                            null
                                    }
                                    {
                                        this.props.displayForm[0] && this.props.displayForm[1] && this.props.displayForm[2] === book.id ? <BookForm book={book} isEdit={true} /> : null
                                    }
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
        isAdmin: state.user.isAdmin,
        displayForm: state.displayForm,
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
        loadBook(id) {
            dispatch(fetchBook(id))
        },
        searchBooks(books, searchTerm) {
            dispatch(fetchFilteredBooks(books, searchTerm));
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(AllBooks));
