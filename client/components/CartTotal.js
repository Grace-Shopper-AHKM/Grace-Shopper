import React from 'react';

export default class CartTotal extends React.Component{
    constructor(){
        super();
        this.getSubtotal = this.getSubtotal.bind(this);
    }

    getSubtotal(){
        var subTotal = 0;
        this.props.cartItems.forEach(item => {
            
            subTotal += (Number(item.price) * Number(item.qty));
        })
        return subTotal;
    }

    render(){
        return(
            <div id='carttotal'>
                <h3>Subtotal: ${this.getSubtotal()}</h3>
                <button>checkout</button>
            </div>
        )
    }
}