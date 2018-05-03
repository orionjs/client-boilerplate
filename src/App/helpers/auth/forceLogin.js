import React from 'react'
import isLoggedIn from './isLoggedIn'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'

export default function(ComposedComponent) {
  @withRouter
  class ForceLogin extends React.Component {
    static propTypes = {
      history: PropTypes.object
    }

    redirect() {
      this.props.history.replace({
        pathname: '/login',
        state: {nextPathname: window.location.pathname}
      })
      return <span />
    }

    render() {
      if (!isLoggedIn()) return this.redirect()
      return <ComposedComponent {...this.props} />
    }
  }

  return ForceLogin
}
