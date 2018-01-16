import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGenres, fetchTotalBooks, fetchBooksByGenre } from '../store';

class GenreBar extends Component {

    handleGenreSort(genre) {
        this.props.loadBooksByGenre(genre);
    }

    render() {
        const genres = ['biography', 'dance', 'fiction', 'graphic novel', 'sports'];
        return (
            <div>
                <h3 id="genre-head">Genres</h3>
                <ul>
                    <NavLink to="/books"><li onClick={this.props.loadAllBooks}>All</li></NavLink>
                    {
                        genres.map(genre => {
                            return (
                                <NavLink key={genre} to={`/books?genre=${genre}`}><li onClick={this.handleGenreSort.bind(this, genre)}>{genre}</li></NavLink>
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
            dispatch(fetchTotalBooks());
        },
        loadBooksByGenre(genre) {
            dispatch(fetchBooksByGenre(genre));
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(GenreBar));