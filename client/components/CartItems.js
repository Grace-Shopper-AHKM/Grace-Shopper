import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { getCart } from '../store';
import store from '../store';

const con = console.log;

export default class CartItems extends React.Component{
    constructor(){
        super();
        this.getUpdatedQty = this.getUpdatedQty.bind(this);
        this.updateItemQty = this.updateItemQty.bind(this);
    }

    deleteItemFromCart(itemid){
        let newCart = [];
        store.getState().cart.forEach((item => {
            if( item.itemId !==  itemid)
                newCart.push(item);
        }))
        store.dispatch(getCart(newCart));
    }

    updateItemQty(event){
        con('event', event.target.value);
        con('props', this.props);
        // let newCart = store.getState().cart.map((item => {
        //     if( item.itemId === itemid)
        //         item.qty = newQty;
        //     return item;
        // }))
        // store.dispatch(getCart(newCart));
    }

    getUpdatedQty(event, itemid){
        con('yyyyyy', event.target.value);
        con('ssssss', itemid)
    }

    render(){
        return(
            <div className="shoppingcartitems">
                <div className='itemimagecontainer' style={{width: '10%'}}>
                    <div style={{width: '70%', height: '70%'}}><img className='itemimages' src='/images/fantastic-beasts.jpg' /></div>
                </div>
                <div className='itemdescription' style={{width: '50%'}}>
                    {this.props.desc}
                    <input type="submit" value="Delete" onClick={() => this.deleteItemFromCart(this.props.itemid)}></input>
                </div>
                <div style={{width: '20%'}}>${this.props.price}</div>




                <div style={{width: '20%'}}>
                        <input className='qtybox' type='text' maxLength="3" defaultValue={this.props.qty} onChange={(event) => this.getUpdatedQty(event, this.props.itemid)}/>
                        <button onClick={() => this.updateItemQty(this.props.itemid) }  >Update</button>
                </div>
            </div>
        )
    }
}