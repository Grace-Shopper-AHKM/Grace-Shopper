import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addBookReview } from '../store/reviews';

class AddReview extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      review: '',
      rating: 0,
      bookId: this.props.bookId
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  render () {
    return (
      <div>
        <div className="label">Add a Review</div>
        <form
          className="form-group"
          onSubmit = {(event) => this.props.handleSubmit(this.state, event)}>
          <div className="field-labels">Review Title</div>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Review title..."
              onChange={this.handleChange}
              value={this.state.title}
            />
          <div className="field-labels">Review Body</div>
            <textarea
              required="true"
              rows="5"
              cols="40"
              wrap="hard"
              className="form-control"
              type="text"
              name="review"
              placeholder="Review..."
              onChange={this.handleChange}
              value={this.state.review}
            />
          <div className="field-labels">Select a Rating:</div>
            <select
              className="form-control"
              type="text"
              name="rating"
              onChange={this.handleChange}
              value={this.state.rating}
            >
              <option key="1" value="1">1</option>
              <option key="2" value="2">2</option>
              <option key="3" value="3">3</option>
              <option key="4" value="4">4</option>
              <option key="5" value="5">5</option>
            </select>
          <br />
          <br />
          <button type="submit" className="body-button">Submit Review</button>
          {/* future implementation: react component that serves a submission confirmation to users */}
        </form>
      </div>
    );
  }
}

function mapStateToProps (storeState) {
  return {};
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    handleSubmit: function(newState, event) {
      event.preventDefault();
      dispatch(addBookReview(newState, ownProps.history));
    }
  };
}

const AddReviewContainer = connect(mapStateToProps, mapDispatchToProps)(AddReview);

export default AddReviewContainer;
