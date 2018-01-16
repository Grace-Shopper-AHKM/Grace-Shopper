import axios from 'axios';

const GET_REVIEWS = 'GET_REVIEWS';
const ADD_REVIEW = 'ADD_REVIEW';

export function getReviews(reviews) {
  return {
    type: GET_REVIEWS,
    reviews
  }
}

export function addReview(review) {
  return {
    type: ADD_REVIEW,
    review
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

export function addBookReview(review, id) {
  return function thunk(dispatch) {
    return axios.post(`/api/books/${id}/reviews`, review)
      .then(res => dispatch(addReview(res.data)))
      .catch(console.error)
  }
}

export default function reviewsReducer(reviews = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;
    case ADD_REVIEW:
      return [...reviews, action.review];
    default:
      return reviews;
  }
}
