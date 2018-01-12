import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllBooks, searchAllBooks } from '../store';
import { SearchBar } from './SearchBar';
import GenreBar from './GenreBar';

class AllBooks extends Component {
    componentDidMount() {
        this.props.loadBooks();
    }

    render() {
        return (
            <div>
            <SearchBar searchBooks={this.props.searchBooks} loadBooks={this.props.loadBooks}/>
            <GenreBar books={this.props.books} />
            <div>
                {
                    this.props.books.map(book => {
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
        books: state.books
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadBooks() {
            dispatch(fetchAllBooks());
        },
        searchBooks(searchTerm) {
            dispatch(searchAllBooks(searchTerm));
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(AllBooks));
