import axios from 'axios';

const GET_ORDERS = 'GET_ORDERS';

//ACTIONS
export function fetchOrdersAction(orders){
    return {
        type: GET_ORDERS,
        orders
    }
}

//THUNKS
export function fetchOrdersThunk(userid){
    return function thunk(dispatch){
        return axios.get('/api/users/userorders/' + userid)
        .then(orders => dispatch(fetchOrdersAction(orders.data)))
        .catch(console.error)
    } 
}

//REDUCER
export default function orderReducer(state = [], action){
    switch(action.type){
        case GET_ORDERS:
            return action.orders
        default:
            return state;
    }
    
}