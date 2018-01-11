import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBook, fetchBookReviews } from '../store';

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
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(SingleBook));