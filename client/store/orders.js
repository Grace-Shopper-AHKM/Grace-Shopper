import axios from 'axios';
import history from '../history'

export function addOrder(order) {
    return function thunk(dispatch) {
      return axios.post('/api/orders/add-order', order)
        .then(history.push('/books'))
        .catch(console.error);
    }
  }


const GET_ORDERS = 'GET_ORDERS';


export function fetchOrdersAction(orders){
    return {
        type: GET_ORDERS,
        orders
    }
}


export function fetchOrdersThunk(userid){
    return function thunk(dispatch){
        return axios.get('/api/users/userorders/' + userid)
        .then(orders => dispatch(fetchOrdersAction(orders.data)))
        .catch(console.error)
    } 
}


export default function orderReducer(state = [], action){
    switch(action.type){
        case GET_ORDERS:
            return action.orders
        default:
            return state;
    }
    
}