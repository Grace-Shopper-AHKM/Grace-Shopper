import React from 'react'

export const CheckoutShippingForm = (props) => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                />
            </div>
            <div>
                <label>Address Line 1:</label>
                <input
                    type="text"
                    name="line1"
                />
            </div>
            <div>
                <label>Address Line 2:</label>
                <input
                    type="text"
                    name="line2"
                />
            </div>
            <div>
                <label>City:</label>
                <input
                    type="text"
                    name="city"
                />
            </div>
            <div>
                <label>State:</label>
                <input
                    type="text"
                    name="state"
                />
            </div>
            <div>
                <label>ZIP:</label>
                <input
                    type="text"
                    name="zip"
                />
            </div>
            <button type="submit">
                Place your order
            </button>
        </form>
    )
}

export default CheckoutShippingForm;