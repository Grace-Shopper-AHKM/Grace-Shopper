import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBook, fetchBookReviews, addItemThunk } from '../store';

class SingleBook extends Component {

    constructor() {
        super();

        this.state = {
            displayReviews: false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.bookId;
        this.props.loadBooks(id);
        this.props.loadReviews(id);
    }

    toggleReviews() {
        this.setState({ displayReviews: !this.state.displayReviews })
    }

    handleSubmit(book, event) {
        event.preventDefault();
        this.props.addBook({[event.target.quantity.value]: book})      
    }


    render() {
        const book = this.props.singleBook;

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
                                <p>This book has {this.props.reviews.length} reviews. <span onClick={this.toggleReviews.bind(this)}><small>(See reviews)</small></span></p>
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
                            {this.props.reviews.map(review => {
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
                                <form onSubmit={this.handleSubmit.bind(this, book)}>
                                <h3>In Stock.</h3>
                                <select name="quantity">
                                    <option>Select quantity</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
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

const mapState = (state) => {
    return {
        singleBook: state.singleBook,
        reviews: state.reviews
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
        addBook(book) {
            dispatch(addItemThunk(book));
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(SingleBook));