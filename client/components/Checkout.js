import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CheckoutShippingForm } from './CheckoutShippingForm';
import { addOrder } from '../store';

export const Checkout = (props) => {
    const { handleSubmit, userId } = props;
    return (
        <div>
            <h1>Checkout</h1>
            <CheckoutShippingForm handleSubmit={handleSubmit} userId={userId} />
            <ul>
                <h3>
                    Order Summary:
                </h3>

                <li>
                    Items:
                </li>

                <h3>
                    Order total:
                </h3>
            </ul>
        </div>
    )
}

// NEED UPDATED USERS, PRODUCTS, CART

const mapStateToProps = function (state, ownProps) {
    // const { cart } = state;
    return {
        cart: state.cart,
        userId: state.user.id
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {
    const { history } = ownProps;
    return {
        handleSubmit(evt, userId) {
            evt.preventDefault();
            let orderStatus = 'pending';
            let orderRecipient = evt.target.firstName.value + ' ' + evt.target.lastName.value;
            let orderEmail = evt.target.email.value;
            let orderAddress =
                evt.target.line1.value
                + ' '
                + evt.target.line2.value
                + ' '
                + evt.target.city.value
                + ' '
                + evt.target.state.value
                + ' '
                + evt.target.zip.value;

            let order = {
                orderStatus,
                orderRecipient,
                orderEmail,
                orderAddress,
                userId
            };
            dispatch(addOrder(order));
            alert('Your order was successfully placed!');
            history.push('/books');
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));