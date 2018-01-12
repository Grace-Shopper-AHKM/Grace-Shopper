import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchCartItems } from '../store';

import CartItems from './CartItems';
import CartTotal from './CartTotal';


class Cart extends React.Component{
    constructor(){
        super();
        // this.state = {
        //     cart: [{itemId: '1', qty: 3, price: '66', desc: 'This book is damn good. you will read it 10 times' }, {itemId: '2', qty: 1, price: '77', desc: 'This book is damn good. you will read it 100 times'}, {itemId: '3', qty: 2, price: '55', desc: 'This book is damn good. you will read it 100 times'}, {itemId: '4', qty: 6, price: '55', desc: 'This book is damn good. you will read it 100 times'}]
        // }
        this.getShoppingCartItems = this.getShoppingCartItems.bind(this);
    }

    componentDidMount() {
        this.props.loadCart();
    }

    getShoppingCartItems(cart){

        return (
            cart.map( (item, idx) => {
                return <CartItems key={idx} item={item} itemid={item.id} qty={item.qty} price={item.price} desc={item.desc} />;
            })
        )          
    }

    render(){
        return (
            <div id='cart' >
                <div style={{width: '80%'}}>
                    <h3>Shopping Cart</h3>
                    <hr></hr>
                    {
                        this.getShoppingCartItems(this.props.cart)
                    }
                </div>
                <div style={{width: '20%'}}>
                    <CartTotal cartItems={this.props.cart}/>
                </div>
            </div>
        )
    }
}


const mapState = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadCart() {
            dispatch(fetchCartItems(cart));
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Cart));
