import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import shippingAddressForm from '../../utils/shippingAddress';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleShipping: false,
        }
    }
    render() {
        // const { cart } = this.props;

        return (
            <div>
                <h1>Checkout{}</h1>

                <h3>
                    Shipping Address:
                    {/* {users.address ? users.address : shippingAddress()} */}
                </h3>

                <button onClick={() => { }}>
                    Place your order
                </button>

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
            </div>
        )
    }
}

// NEED UPDATED USERS, PRODUCTS, CART

const mapStateToProps = function (state, ownProps) {
    // const { cart } = state;
    return {
        // cart
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        updateAddress() {
            dispatch(/* UPDATE ADDRESS */);
        },
        purchase() {
            dispatch(/* DELETE ITEM */);
        },
        handleSubmit() {
            dispatch(/* ADD SHIPPING ITEM */)
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));