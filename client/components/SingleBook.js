import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { fetchBook, fetchBookReviews, addItemThunk, addToExistingItemThunk, addToSessionCart, addToDBCart } from '../store';
import AddReview from './AddReview';

export class SingleBook extends Component {

    constructor() {
        super();

        this.state = {
            displayReviews: false
        }
        this.toggleReviews = this.toggleReviews.bind(this);
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
        const { book, reviews, handleSubmit, maxQuantity, user } = this.props;
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
                        this.props.user.id ?
                        <AddReview bookId={this.props.match.params.bookId} />
                        : null
                      }
                    </div>
                    <div>
                        {
                            this.state.displayReviews
                                ?
                                <div>
                                    <button onClick={this.toggleReviews}>Hide Reviews</button>
                                    {reviews && reviews.map(review => {
                                        return (
                                            <ul key={review.id}>
                                                <li>{review.title}, {review.rating} stars</li>
                                                <li>by {review.user ? review.user.name : this.props.user.name}</li>
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
                    <h4>${book.price / 100}</h4>
                    {
                        book.inventory > 0
                            ?
                            <div>
                                <form onSubmit={(evt) => {
                                    handleSubmit(evt, book, user.id)
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
        maxQuantity: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        user: state.user
    }
}

const mapDispatch = (dispatch, ownProps) => {
    const { history } = ownProps;
    return {
        loadBooks(id) {
            dispatch(fetchBook(id));
        },
        loadReviews(id) {
            dispatch(fetchBookReviews(id));
        },
        handleSubmit(evt, book, userId) {
            evt.preventDefault();
            let updateItem = store.getState().cart.filter(item => { return item.id === book.id })
            const item = { id: book.id, qty: Number(evt.target.quantity.value) };
            if (updateItem.length > 0) {
                dispatch(addToExistingItemThunk({ id: book.id, qty: Number([evt.target.quantity.value]) }, store.getState().user.id));
            }
            else {
                dispatch(addItemThunk({ id: book.id, qty: Number([evt.target.quantity.value]), book }));
            }
            dispatch(addToSessionCart(item));
            if(userId) dispatch(addToDBCart(item, userId));
            alert('Your book was added to your cart!');
            history.push('/books');
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(SingleBook));
