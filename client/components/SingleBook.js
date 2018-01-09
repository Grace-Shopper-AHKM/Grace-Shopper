import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBook } from '../store';

class SingleBook extends Component {

    componentDidMount() {
        this.props.loadBooks(this.props.match.params.bookId);
    }

    render() {
        const book = this.props.singleBook;

        return (
            <div>
                <img src={book.photo} />
                <div>
                    <div>
                        <h3>{book.title}</h3>
                        <h5>by {book.author}</h5>
                    </div>
                    <div>
                        <p>{book.description}</p>
                    </div>
                </div>
                <div>
                    <h4>${book.price}</h4>
                    {
                        book.inventory > 0
                            ?
                            <div>
                                <h3>In Stock.</h3>
                                <button>Add to Cart</button>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        singleBook: state.singleBook
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadBooks(id) {
            dispatch(fetchBook(id));
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(SingleBook));