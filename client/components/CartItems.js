import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { deleteItem } from '../store';

const con = console.log;

export default class CartItems extends Component {
    constructor() {
        super();
    }

    deleteItemFromCart(item) {
        store.dispatch(deleteItem(item));
    }

    render() {
        const { item } = this.props;
        return (
            <div className="shoppingcartitems">
                <div className='itemimagecontainer' style={{ width: '10%' }}>
                    <div style={{ width: '70%', height: '70%' }}><img className='itemimages' src='/images/fantastic-beasts.jpg' /></div>
                </div>
                <div className='itemdescription' style={{ width: '50%' }}>
                    <h3>{item[Object.keys(item)[0]].title}</h3>
                    <p>{item[Object.keys(item)[0]].description}</p>

                    <input type="submit" value="Delete" onClick={() => this.deleteItemFromCart(item)}></input>


                </div>
                <div style={{ width: '20%' }}>${item[Object.keys(item)[0]].price}</div>
                <div style={{ width: '20%' }}>
                    <input className='qtybox' type='text' maxLength="3" defaultValue={Object.keys(item)[0]} />
                    <button>Update</button>
                </div>
            </div>
        )
    }
}