import axios from 'axios';

const GET_GENRES = 'GET_GENRES';

export function getGenres(genres) {
    return {
        type: GET_GENRES,
        genres
    }
}

//ES: this is a ton of work for little result
//CG: make a route if it is it's own model, or numerate over the model, or use default data
export function fetchGenres() {
    return function thunk(dispatch) {
        return axios.get('/api/books')
            .then(res => res.data)
            .then(books => {
                let genres = [];
                        books.map(book => {
                            if (!genres.includes(book.genre)) {
                                genres.push(book.genre);
                            }
                        })
                
                        return genres.sort();
            })
            .then(genres => dispatch(getGenres(genres)))
            .catch(console.error);
    }
}

export default function genreReducer(state = [], action) {
    switch (action.type) {
        case GET_GENRES:
            return action.genres;
        default:
            return state;
    }
}