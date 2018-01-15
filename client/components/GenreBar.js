import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGenres, fetchAllBooks } from '../store';

class GenreBar extends Component {

    handleGenreSort(genre) {
        this.props.loadBooksByGenre(genre);
    }

    render() {
        const genres = ['biography', 'dance', 'fiction', 'graphic novel', 'sports'];
        return (
            <div>
                <h3>Genres</h3>
                <ul>
                    <li><span onClick={this.props.loadAllBooks}>All</span></li>
                    {
                        genres.map(genre => {
                            return (
                                <li key={genre}><span onClick={this.handleGenreSort.bind(this, genre)}>{genre}</span></li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadGenres() {
            dispatch(fetchGenres());
        },
        loadAllBooks() {
            dispatch(fetchAllBooks());
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(GenreBar));