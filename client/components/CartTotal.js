import React, { Component } from 'react';

export default class CartTotal extends Component {
    constructor() {
        super();
        this.getSubtotal = this.getSubtotal.bind(this);
    }

    getSubtotal() {
        var subTotal = 0;
        this.props.cartItems.forEach(item => {
            subTotal += (Number(item.qty) * Number(item.book.price));
        })
        return subTotal / 100;
    }

    render() {
        return (
            <div id='carttotal'>
                <h3>Subtotal: ${this.getSubtotal()}</h3>
                <button>checkout</button>
            </div>
        )
    }
}