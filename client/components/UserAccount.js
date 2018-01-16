import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserAccount = (props) => {
    const { user } = props

    return (
        <div>
            {
                <div>
                    <h1>
                        {user.name}'s boook Account
                    </h1>
                    <img src={user.photo} />
                    <h3>
                        {
                            <NavLink to={`/users/${user.id}/orders`}>Your Orders</NavLink>
                        }
                    </h3>
                    <h3>
                        Email: {user.email}
                    </h3>
                    <h3>
                        Address: {user.address}
                    </h3>
                </div>
            }
        </div>
    )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        user: state.user,
        isLoggedIn: !!state.user.id
    }
}

export default withRouter(connect(mapState)(UserAccount))

/**
 * PROP TYPES
 */
UserAccount.propTypes = {
    userId: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired
}
