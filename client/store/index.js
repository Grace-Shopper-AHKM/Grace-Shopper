import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import books from './allBooks';
import singleBook from './singleBook';
import cart from './getCart';
import reviews from './reviews';
import searchFilter from './searchFilter'

const reducer = combineReducers({
  user,
  books,
  singleBook,
  cart,
  reviews,
  searchFilter
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
export * from './getCart';
export * from './reviews';
export * from './searchFilter';
