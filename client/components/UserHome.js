import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { name, isLoggedIn, isAdmin } = props

  return (
    <div>
      {
        isLoggedIn
          ? <h3>Welcome, {name}</h3>
          : <h3>Welcome!</h3>
      }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    name: state.user.name,
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

export default withRouter(connect(mapState)(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired
}
