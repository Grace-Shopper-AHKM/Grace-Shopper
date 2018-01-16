import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CheckoutShippingForm } from './CheckoutShippingForm';
import { addOrder } from '../store';

export const Checkout = (props) => {
    const { handleSubmit } = props;
    return (
        <div>
            <h1>Checkout</h1>
            <CheckoutShippingForm handleSubmit={handleSubmit} />
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
        cart: state.cart
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleSubmit(evt) {
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
                orderAddress
            };
            dispatch(addOrder(order));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));