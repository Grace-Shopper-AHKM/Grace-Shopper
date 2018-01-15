import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllBooks, searchAllBooks, deleteBookFromDB, fetchBook } from '../store';
import { SearchBar } from './SearchBar';
import GenreBar from './GenreBar';
import BookForm from './BookForm';
import store, { displayForm } from '../store';

class AllBooks extends Component {

    componentDidMount() {
        this.props.loadBooks();
    }

    setToEdit(id) {
        store.dispatch(displayForm(true, true, id))
    }

    setToCreate() {
        store.dispatch(displayForm(true, false))
    }

    render() {
        return (
            <div>
                {
                    this.props.isAdmin
                        ?
                        (
                        <div>
                            <button onClick={this.setToCreate.bind(this)}>Add a book</button>
                            { this.props.displayForm[0] && !this.props.displayForm[1] ? <BookForm isEdit={false} /> : null }
                        </div>
                        )
                        :
                        null

                }
                <div>
                    <SearchBar searchBooks={this.props.searchBooks} loadBooks={this.props.loadBooks}/>
                    <GenreBar books={this.props.books} />
                </div>
            <div>
                {
                    this.props.books.map(book => {
                            return (
                                <div key={book.id}>
                                    <img src={book.photoUrl} />
                                    <ul>
                                        <NavLink to={`/books/${book.id}`}><li>{book.title}</li></NavLink>
                                        <li>by {book.author}</li>
                                        <li>${book.price / 100}</li>
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
                                    {
                                        this.props.isAdmin
                                            ?
                                            (
                                                [
                                                    <button key="2" onClick={this.setToEdit.bind(this, book.id)}>Edit</button>,
                                                    <button key="1" onClick={() => this.props.deleteOneBook(book)}>Delete</button>
                                                ]
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
        displayForm: state.displayForm
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadBooks() {
            dispatch(fetchAllBooks());
        },
        searchBooks(searchTerm) {
            dispatch(searchAllBooks(searchTerm));
        },
        deleteOneBook(book) {
            dispatch(deleteBookFromDB(book))
        },
        loadBook(id) {
            dispatch(fetchBook(id))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(AllBooks));
