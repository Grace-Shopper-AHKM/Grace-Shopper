import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import store, {fetchOrdersThunk, fetchAllBooks} from '../store';

const con = console.log;

/**
 * COMPONENT
 */
export class Orders extends React.Component {

    componentDidMount(){
        this.props.loadBooks();
        this.props.loadOrders();
        con()
    }

    render(){
        let orders = store.getState().orders.map(order => {
            let book = store.getState().books.filter(book => {return order.bookId === book.id})
            return (
                <div key={order.id}>
                    <div><NavLink to={`/books/${book[0].id}`}><img src={book[0].photoUrl} className="all-books-book-block" /></NavLink></div>
                    Ordered on: {order.createdAt.substring(0, 10)}
                </div>
            )
        })
        return (
            <div>
                <h1>
                    Your Orders:
                    {orders}
                </h1>
            </div>
        )
    }

    
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        loadOrders(){
            let userid = ownProps.location.pathname;
            userid = userid.substring(1)
            userid = userid.substring(userid.indexOf('/')).substring(1)
            userid = userid.substring(0, userid.indexOf('/'))
            dispatch(fetchOrdersThunk(userid));
        },
        loadBooks() {
            dispatch(fetchAllBooks());
        },
    }
}

export default withRouter(connect(mapState, mapDispatch)(Orders))

/**
 * PROP TYPES
 */
Orders.propTypes = {
}
