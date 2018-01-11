
const GET_CART = 'GET_CART';
const DELETE_ITEM = 'DELETE_ITEM';

const cart = [{itemId: '1', qty: 3, price: '66', desc: 'This book is damn good. you will read it 10 times' }, {itemId: '2', qty: 1, price: '77', desc: 'This book is damn good. you will read it 100 times'}, {itemId: '3', qty: 2, price: '55', desc: 'This book is damn good. you will read it 100 times'}, {itemId: '4', qty: 6, price: '55', desc: 'This book is damn good. you will read it 100 times'}]

//// ACTIONS
export function getCart(cart) {
    return {
        type: GET_CART,
        cart
    }
}

export function deleteItem(cart){
    return {
        type: DELETE_ITEM,
        cart
    }
}

//THUNKS
export function fetchCartItems() {
    return function thunk(dispatch) {
        return dispatch(getCart(cart))
    }
}

export function deleteItemFromCart(){
    return function thunk(dispatch){
        return dispatch()
    }
}

//// REDUCER
export default function cartReducer(state = [], action) {
    switch (action.type) {
        case GET_CART:
            return action.cart;
        default:
            return state;
    }
}
