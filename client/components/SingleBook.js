import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { fetchBook, fetchBookReviews, addItemThunk, addToExistingItemThunk } from '../store';

class SingleBook extends Component {

    constructor() {
        super();

        this.state = {
            displayReviews: false
        }
        this.toggleReviews.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.bookId;
        this.props.loadBooks(id);
        this.props.loadReviews(id);
    }

    toggleReviews() {
        this.setState({ displayReviews: !this.state.displayReviews })
    }

    render() {
        const { book, reviews, handleSubmit, maxQuantity } = this.props;
        return (
            <div>
                <img src={book.photoUrl} />
                <div>
                    <div>
                        <h3>{book.title}</h3>
                        <h5>by {book.author}</h5>
                        {
                            !this.state.displayReviews
                                ?
                                <p>This book has {reviews.length} reviews.
                                <span onClick={this.toggleReviews}>
                                        <small>(See reviews)</small>
                                </span>
                                </p>
                                :
                                null
                        }
                    </div>
                    <div>
                        {
                            this.state.displayReviews
                                ?
                                <div>
                                    <button onClick={this.toggleReviews.bind(this)}>Hide Reviews</button>
                                    {reviews.map(review => {
                                        return (
                                            <ul key={review.id}>
                                                <li>{review.title}, {review.rating} stars</li>
                                                <li>by {review.user.fullName}</li>
                                                <li>{review.review}</li>
                                            </ul>
                                        )
                                    })}
                                </div>
                                :
                                null
                        }
                        <p>{book.description}</p>
                    </div>
                </div>
                <div>
                    <h4>${book.price}</h4>
                    {
                        book.inventory > 0
                            ?
                            <div>
                                <form onSubmit={(evt) => {
                                    handleSubmit(evt, book)
                                }}>
                                    <h3>In Stock.</h3>
                                    <select name="quantity" required="true">
                                        <option name="default" value="" disabled="true" selected>Select a quantity</option>
                                        {
                                            maxQuantity.map(quantity => {
                                                return (
                                                    <option key={quantity}>{quantity}</option>
                                                );
                                            })
                                        }
                                    </select>
                                    <button type="submit">Add to Cart</button>
                                </form>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        )
    }
}

const mapState = (state, ownProps) => {
    const bookId = Number(ownProps.match.params.bookId);
    const book = state.books.find(book => bookId === book.id);
    return {
        book,
        reviews: state.reviews,
        maxQuantity: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
}

const mapDispatch = (dispatch) => {

    return {
        loadBooks(id) {
            dispatch(fetchBook(id));
        },
        loadReviews(id) {
            dispatch(fetchBookReviews(id));
        },
        handleSubmit(evt, book) {
            evt.preventDefault();
            let updateItem = store.getState().cart.filter(item => {return item.id === book.id} )
            if(updateItem.length > 0)
                dispatch(addToExistingItemThunk({ id: book.id, qty: Number([evt.target.quantity.value]) }, store.getState().user.id));
            else
                dispatch(addItemThunk({ id: book.id, qty: Number([evt.target.quantity.value]), book }));
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(SingleBook));