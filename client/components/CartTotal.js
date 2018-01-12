import React, { Component } from 'react';

export default class CartTotal extends Component {
    constructor() {
        super();
        this.getSubtotal = this.getSubtotal.bind(this);
    }

    getSubtotal() {
        var subTotal = 0;
        this.props.cartItems.forEach(item => {
            // item {2: {id: 1, title:... price: ...}}
            for (let key in item) {
                let price = item[key].price
                subTotal = subTotal + Number(key * price)
            }
        })
        return subTotal;
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