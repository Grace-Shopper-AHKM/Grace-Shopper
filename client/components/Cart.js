import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCartItems } from '../store';

import CartItems from './CartItems';
import CartTotal from './CartTotal';


class Cart extends Component {
    constructor() {
        super();
        this.getShoppingCartItems = this.getShoppingCartItems.bind(this);
    }

    componentDidMount() {
        this.props.loadCart();
    }

    getShoppingCartItems(cart) {
        return (
            cart.map((item) => {
                return <CartItems key={item.id} item={item} />;
            })
        )
    }
    
    render() {
        const { cart, history } = this.props;
        return (
            <div id='cart' >
                <div style={{ width: '80%' }}>
                    <h3>Shopping Cart</h3>
                    <hr></hr>
                    {
                        this.getShoppingCartItems(cart)
                    }
                </div>
                <div style={{ width: '20%' }}>
                    <CartTotal cartItems={cart} history={history} />
                </div>
            </div>
        )
    }
}


const mapState = (state, ownProps) => {
    return {
        cart: state.cart,
        history: ownProps.history
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadCart() {
            dispatch(fetchCartItems(cart));
        },

    }
}

export default withRouter(connect(mapState, mapDispatch)(Cart));
