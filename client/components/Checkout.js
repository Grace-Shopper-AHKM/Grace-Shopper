import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { CheckoutGuest } from './CheckoutGuest';
// import { CheckoutUser } from './CheckoutUser';
import { CheckoutAddressForm } from './CheckoutAddressForm';
import { addOrder } from '../store';

export class Checkout extends Component {
    constructor() {
        super();
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <h1>Checkout</h1>
                <CheckoutAddressForm handleSubmit={handleSubmit} />
                <ul>
                    <h3>
                        Order Summary:
                    </h3>

                    <li>
                        Items:
                    </li>

                    <li>
                        Shipping &amp; Handling:
                    </li>

                    <li>
                        Total before tax: {}
                    </li>

                    <li>
                        Estimated tax to be collected:
                    </li>

                    <h3>
                        Order total:
                    </h3>
                </ul>
                {/* <CheckoutUser />
                <CheckoutGuest /> */}
            </div>
        )
    }
}

// NEED UPDATED USERS, PRODUCTS, CART

const mapStateToProps = function (state, ownProps) {
    return {
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleSubmit(evt) {
            console.log('hellookfoasdkfoaksdf');
            evt.preventDefault();
            let orderStatus = 'pending';
            let orderRecipient = evt.target.firstName.value + ' ' + evt.target.lastName.value;
            let orderEmail = evt.target.email.value;
            let orderAddress =
                evt.target.line1.value +
                ' ' +
                evt.target.line2.value +
                ', ' +
                evt.target.state.value +
                ', ' +
                evt.target.zip.value;

            let order = {
                orderStatus,
                orderRecipient,
                orderEmail,
                orderAddress
            }
            dispatch(addOrder(order));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));