import React from 'react';

export default class CartItems extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="shoppingcartitems">
                <div style={{width: '10%'}}>
                    <div style={{width: '70%', height: '70%'}}><img className='itemimages' src='/images/fantastic-beasts.jpg' /></div>
                </div>
                <div style={{width: '50%'}}>{this.props.desc}</div>
                <div style={{width: '20%'}}>${this.props.price}</div>
                <div style={{width: '20%'}}>{this.props.qty}</div>
            </div>
        )
    }
}