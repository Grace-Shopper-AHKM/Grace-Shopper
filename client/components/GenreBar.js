import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGenres, fetchBooksByGenre } from '../store';

class GenreBar extends Component {

    componentDidMount() {
        this.props.loadGenres();
    }

    handleGenreSort(genre) {
        this.props.loadBooksByGenre(genre);
    }

    render() {
        const genres = this.props.genres;
        return (
            <div>
                <h3>Genres</h3>
                <ul>
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
        genres: state.genres
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadGenres() {
            dispatch(fetchGenres());
        },
        loadBooksByGenre(genre) {
            dispatch(fetchBooksByGenre(genre));
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(GenreBar));