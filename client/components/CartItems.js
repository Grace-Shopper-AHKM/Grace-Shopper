import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { deleteItem, updateCartItem } from '../store';

const con = console.log;

export default class CartItems extends Component {
    constructor() {
        super();
        this.qty = '';
        this.getUpdatedQty = this.getUpdatedQty.bind(this);
        this.updateItemQty = this.updateItemQty.bind(this);
    }

    deleteItemFromCart(item) {
        store.dispatch(deleteItem(item));
    }

    updateItemQty(event, itemid){
        let itemsToUpdate = store.getState().cart.map(item => {
            if(item.id === itemid)
                item.qty = Number(this.qty);
            return item;
        })
        store.dispatch(updateCartItem(itemsToUpdate));
    }

    getUpdatedQty(event, itemid){
        this.qty = event.target.value;
    }

    render() {
        const { item } = this.props;
        return (
            <div className="shoppingcartitems">
                <div className='itemimagecontainer' style={{ width: '10%' }}>
                    <div style={{ width: '70%', height: '70%' }}><img className='itemimages' src='/images/fantastic-beasts.jpg' /></div>
                </div>
                <div className='itemdescription' style={{ width: '50%' }}>
                    <h3>{item.book.title}</h3>
                    <p>{item.book.description}</p>
                    <input type="submit" value="Delete" onClick={() => this.deleteItemFromCart(item)}></input>
                </div>
                <div style={{ width: '20%' }}>${item.book.price / 100}</div>
                <div style={{ width: '20%' }}>
                    <input className='qtybox' type='number' maxLength="3" defaultValue={item.qty} onChange={(event) => this.getUpdatedQty(event, this.props.itemid)}/>
                    <button onClick={(event) => this.updateItemQty(event, item.id) }  >Update</button>
                </div>
            </div>
        )
    }
}