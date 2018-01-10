import axios from 'axios';

const GET_REVIEWS = 'GET_REVIEWS';

export function getReviews(reviews) {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

export function fetchBookReviews(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/books/${id}/reviews`)
            .then(res => res.data)
            .then(reviews => dispatch(getReviews(reviews)))
            .catch(console.error)
    }
}

export default function reviewsReducer(state = [], action) {
    switch (action.type) {
        case GET_REVIEWS:
            return action.reviews;
        default:
            return state;
    }
}