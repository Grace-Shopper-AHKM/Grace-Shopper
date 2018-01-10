import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/**
 * COMPONENT
 */
export const Orders = (props) => {
    const { } = props

    return (
        <div>
            <h1>
                Your Orders
            </h1>
        </div>
    )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        
    }
}

export default withRouter(connect(mapState)(Orders))

/**
 * PROP TYPES
 */
Orders.propTypes = {
}
