import React from 'react';
import CartItems from './CartItems';
import CartTotal from './CartTotal';

export default class Cart extends React.Component{
    constructor(){
        super();
        this.state = {
            cart: [{itemId: '1', qty: 3}, {itemId: '2', qty: 1}, {itemId: '3', qty: 2}, {itemId: '4', qty: 6}]
        }

        this.getShoppingCartItems = this.getShoppingCartItems.bind(this);
    }

    getShoppingCartItems(){
        return (
            this.state.cart.map( (item, idx) => {
                return <CartItems key={idx} />;
            })
        )          
    }

    render(){
        return(
            <div id='cart' >
                <div style={{width: '80%'}}>
                    <h3>Shopping Cart</h3>
                    <hr></hr>
                    {this.getShoppingCartItems()}
                </div>
                <div style={{width: '20%'}}>
                    <CartTotal />
                </div>
            </div>
        )
    }
}

