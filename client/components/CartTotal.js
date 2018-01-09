import React from 'react';

export default class CartTotal extends React.Component{
    render(){
        return(
            <div id='carttotal'>
                <h3>Subtotal: $450</h3>
                <button>checkout</button>
            </div>
        )
    }
}