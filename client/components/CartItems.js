import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import store, { deleteItem } from '../store';

const con = console.log;

export default class CartItems extends React.Component{
    constructor(){
        super();
    }

    deleteItemFromCart(item){
        store.dispatch(deleteItem(item));
    }

    render(){
        return(
            <div className="shoppingcartitems">
                <div className='itemimagecontainer' style={{width: '10%'}}>
                    <div style={{width: '70%', height: '70%'}}><img className='itemimages' src='/images/fantastic-beasts.jpg' /></div>
                </div>
                <div className='itemdescription' style={{width: '50%'}}>
                    {this.props.desc}
                    
                    <input type="submit" value="Delete" onClick={() => this.deleteItemFromCart(this.props.item)}></input>


                </div>
                <div style={{width: '20%'}}>${this.props.price}</div>
                <div style={{width: '20%'}}>
                    <input className='qtybox' type='text' maxLength="3" defaultValue={this.props.qty} />
                    <button>Update</button>
                </div>
            </div>
        )
    }
}