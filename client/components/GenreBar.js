import React, { Component } from 'react';

export default class GenreBar extends Component {

    getGenres() {
        console.log('callled')
        let genres = [];

        this.props.books.map(book => {
            if (!genres.includes(book.genre)) {
                genres.push(book.genre);
            }
        })

        return genres;
    }

    render() {
        const genres = this.getGenres();
        return (
            <div>
                <h3>Genres</h3>
                <ul>
                    {
                        genres.map(genre => {
                            return (
                                <li key={genre}>{genre}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}