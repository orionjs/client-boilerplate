import React from 'react'
import authRouteRegex from './Auth/routeRegex'
import App from './App'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'
import DynamicComponent from 'App/components/DynamicComponent'

@withRouter
export default class Component extends React.Component {
  static propTypes = {
    location: PropTypes.object
  }

  render() {
    if (authRouteRegex.test(this.props.location.pathname)) {
      const Component = DynamicComponent(() => import('./Auth'))
      return <Component />
    } else {
      return <App />
    }
  }
}
