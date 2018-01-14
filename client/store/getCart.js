
const GET_CART = 'GET_CART';
const DELETE_ITEM = 'DELETE_ITEM';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const UPDATE_ITEM_QTY = 'UPDATE_ITEM_QTY';
const ADD_TO_EXISTING_ITEM = 'ADD_TO_EXISTING_ITEM';

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

export function updateCartItem(cart){
    return {
        type: UPDATE_ITEM_QTY,
        cart
    }
}

export function addToExistingItem(item) {
    return {
        type: ADD_TO_EXISTING_ITEM,
        item
    }
}

//THUNKS
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

export function addToExistingItemThunk(item) {
    return function thunk(dispatch) {
        return dispatch(addToExistingItem(item))
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
        case UPDATE_ITEM_QTY:
            return action.cart;
        case ADD_TO_EXISTING_ITEM:
            return state.map(item => {
                if(item.id === action.item.id)
                    item.qty += action.item.qty;
                return item;
            })
        default:
            return state;
    }
}
