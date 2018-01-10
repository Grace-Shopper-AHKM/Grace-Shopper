function shippingAddressForm() {
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
                <label>State/Province/Region:</label>
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
            <div>
                <label>Country:</label>
                <input
                    type="text"
                    name="country"
                />
            </div>
            <div>
                <label>Phone Number:</label>
                <input
                    type="text"
                    name="phoneNumber"
                />
            </div>
        </form>
    )
}
export default shippingAddressForm;