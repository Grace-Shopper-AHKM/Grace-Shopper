import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
                                    <li>{book.title}</li>
                                    <li>by {book.author}</li>
                                    <li>${book.price}</li>
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
