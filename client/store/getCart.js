
const GET_CART = 'GET_CART';
const DELETE_ITEM = 'DELETE_ITEM';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';

//// ACTIONS
export function getCart(cart) {
    return {
        type: GET_CART,
        cart
    }
}

export function deleteItem(item){
    return {
        type: DELETE_ITEM,
        item
    }
}

export function addItemToCart(item) {
    return {
        type: ADD_ITEM_TO_CART,
        item
    }
}

//THUNKS
//ES: WHAT IS THIS???
export function fetchCartItems() {
    return function thunk(dispatch) {
        return dispatch(getCart(cart))
    }
}

export function addItemThunk(item) {
    return function thunk(dispatch) {
        return dispatch(addItemToCart(item))
    }
}

export function deleteCartItem(item){
    return function thunk(dispatch){
        return dispatch(deleteItem(item))
    }
}

//// REDUCER
export default function cartReducer(state = [], action) {
    switch (action.type) {
        case GET_CART:
            return state;
        case ADD_ITEM_TO_CART:
            return [...state, action.item];
        case DELETE_ITEM:
            return state.filter(item => {
                return item.id !== action.item.id
            })
        default:
            return state;
    }
}
