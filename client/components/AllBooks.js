import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllBooks } from '../store';

class AllBooks extends Component {
    componentDidMount() {
        this.props.loadBooks();
    }

    render() {
        return (
            <div>
                {
                    this.props.books.map(book => {
                            return (
                                <div key={book.id}>
                                    <img src={book.photo} />
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
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(AllBooks));
