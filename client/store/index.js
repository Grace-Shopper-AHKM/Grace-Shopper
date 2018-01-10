import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import books from './allBooks';
import singleBook from './singleBook';
import reviews from './reviews';

const reducer = combineReducers({
  user,
  books,
  singleBook,
  reviews
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './allBooks';
export * from './singleBook';
export * from './reviews';
