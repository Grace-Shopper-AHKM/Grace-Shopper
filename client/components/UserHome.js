import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { firstName, isLoggedIn } = props

  return (
    <div>
      {
        isLoggedIn
          ? <h3>Welcome, {firstName}</h3>
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
    firstName: state.user.firstName,
    isLoggedIn: !!state.user.id
  }
}

export default withRouter(connect(mapState)(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired
}
