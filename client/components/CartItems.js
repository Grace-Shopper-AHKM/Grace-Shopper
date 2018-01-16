import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { deleteItem, updateCartItem, deleteFromSessionCart, deleteFromDBCart, updateSessionCartQuantity, editQuantityDBCart } from '../store';


class CartItems extends Component {
    constructor() {
        super();
        this.qty = '';
        this.getUpdatedQty = this.getUpdatedQty.bind(this);
        this.updateItemQty = this.updateItemQty.bind(this);
    }

    deleteItemFromCart(item) {
        store.dispatch(deleteItem(item));
    }

    updateItemQty(event, itemid) {
        let itemsToUpdate = store.getState().cart.map(item => {
            if (item.id === itemid)
                item.qty = Number(this.qty);
            return item;
        })
        store.dispatch(updateCartItem(itemsToUpdate));
    }

    getUpdatedQty(event, itemid) {
        this.qty = event.target.value;
    }

    render() {
        const { item, handleSubmit, handleUpdate, userId } = this.props;
        return (
            <div className="shoppingcartitems">
                <form onSubmit={(event) => {
                    handleUpdate(event, item.id, userId);
                    this.updateItemQty(event, item.id)
                }}>
                    <div className="item-info">
                    <img className='itemimages' src={item.book.photoUrl} />
                    <div className='itemdescription'>
                        <h3>{item.book.title}</h3>
                        <p>{item.book.description}</p>
                        <input type="submit" value="Delete" onClick={(event) => {
                            this.deleteItemFromCart(item);
                            handleSubmit(event, item, userId);
                        }}
                        ></input>
                    </div>
                    </div>
                    <div className="cart-item-price">${item.book.price / 100 }</div>
                    <div>
                        <label name="Quantity">Quantity</label>
                        <input className='qtybox' type='number' maxLength="3" name="quantity" defaultValue={item.qty} onChange={(event) => this.getUpdatedQty(event, this.props.itemid)} />
                        <button type="submit" >Update</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapState = (state, ownProps) => {
    return {
        userId: state.user.id
    }
}

const mapDispatch = (dispatch, ownProps) => {
    const { history } = ownProps;
    return {
        handleSubmit(event, book, userId) {
            event.preventDefault();
            const itemId = book.id;
            dispatch(deleteFromSessionCart(itemId));
            if (userId) dispatch(deleteFromDBCart(itemId, userId));
        },
        handleUpdate(event, itemId, userId) {
            event.preventDefault();
            const item = { itemId, qty: Number([event.target.quantity.value]) };
            dispatch(updateSessionCartQuantity(item));
            if (userId) dispatch(editQuantityDBCart(item, userId));
        }
    }
}
export default withRouter(connect(mapState, mapDispatch)(CartItems));