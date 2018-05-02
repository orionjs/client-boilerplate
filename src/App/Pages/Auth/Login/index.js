import React from 'react'
import AutoForm from 'App/components/AutoForm'

export default class Login extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <AutoForm mutation="loginWithPassword" />
      </div>
    )
  }
}
